import * as Collections from 'typescript-collections';
import * as haversine from 'haversine';
import{Airport} from '../models/Airport';

module AStarRouteSearch {
    export function getShortestPath(origin: number, dest: number, vertices: Map<number, Airport>, edges: Map<number, number[]>) {

        console.log('origin: ' + origin);
        console.log('dest: ' + dest);
        console.log('vertices: ' + vertices);
        console.log('edges: ' + edges);

        let closedSet : number[] = [];
        let openSet : number[] = [];
        openSet.push(origin);

        let cameFrom : Map<number, number> = new Map<number, number>();

        let gScore : Map<number, number> = new Map<number, number>();
        gScore.set(origin, 0);

        let fScore : Map<number, number> = new Map<number, number>();

        //heuristic cost estimate is geodistance between points
        fScore.set(origin, haversine(
            {latitude: vertices.get(origin).latitude, longitude: vertices.get(origin).longitude},
            {latitude: vertices.get(dest).latitude, longitude: vertices.get(dest).longitude}
            ));

        let count = 0;
        while (openSet.length != 0) {
            console.log('count: ' + count++);
            //get node with lowest score in openSet
            let current = openSet[0];
            console.log('current: ' + current);
            openSet.forEach(function(item){
                if(fScore.get(item) < fScore.get(current)) {
                    current = item;
                }
            });
            
            if (current == dest) {
                console.log("Found path!");
                return reconstructPath(cameFrom, current);
            }
            openSet.splice(openSet.indexOf(current), 1);
            closedSet.push(current);

            console.log('openSet: ' + openSet);
            console.log('closedSet: ' + closedSet);

            //get edges of current
            let neighbours = edges.get(current);
            console.log('neighbours: ' + neighbours);
            neighbours.forEach(function(n){

                console.log('n: ' + n);
                if(!closedSet.includes(n)) {
                    if(!openSet.includes(n)) {
                        openSet.push(n);
                    }
                    let tentative_gScore = gScore.get(current) + haversine(
                            {latitude: vertices.get(current).latitude, longitude: vertices.get(current).longitude},
                            {latitude: vertices.get(n).latitude, longitude: vertices.get(n).longitude}
                        );
                    if (tentative_gScore < gScore.get(n)) {
                        cameFrom.set(n, current);
                        gScore.set(n, tentative_gScore);
                        //heuristic cost estimate is geodistance between points
                        fScore.set(n, gScore.get(n) + haversine(
                            {latitude: vertices.get(n).latitude, longitude: vertices.get(n).longitude},
                            {latitude: vertices.get(dest).latitude, longitude: vertices.get(dest).longitude}
                            ));
                    }
                }
            });
        }
    }

    function reconstructPath(cameFrom: Map<number, number>, current: number) {
        let totalPath = new Collections.Set<number>();
        totalPath.add(current);
        let node = current;
        while (cameFrom.has(node)) {
            node = cameFrom.get(node);
            totalPath.add(node);
        }
        console.log(totalPath);
        return totalPath;
    }
}
export {AStarRouteSearch}