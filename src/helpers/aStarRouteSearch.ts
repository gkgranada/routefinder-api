import * as Collections from 'typescript-collections';
import * as haversine from 'haversine';
import {Airport} from '../models/airport';

module AStarRouteSearch {

    /** plots shortest route using the A* Graph Search algorithm and returns list of nodes
     *  based on pseudocode from: https://en.wikipedia.org/wiki/A*_search_algorithm
     *  cost function / heuristic distance is based on haversine distance between points
    */
    export function getShortestPath(origin: number, dest: number, vertices: Map<number, Airport>, edges: Map<number, number[]>) : number[] {

        let closedList : number[] = [];
        let openList : number[] = [];
        openList.push(origin);

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
        while (openList.length != 0) {
            //get node with lowest score in openList
            let current = openList[0];
            openList.forEach(function(item){
                if(fScore.get(item) < fScore.get(current)) {
                    current = item;
                }
            });
            
            if (current == dest) {
                return reconstructPath(cameFrom, current);
            }
            openList.splice(openList.indexOf(current), 1);
            closedList.push(current);

            //get edges of current
            let neighbours = edges.get(current);
            if(null != neighbours && neighbours.length > 0) {
                neighbours.forEach(function(neighbour){

                    let neighbourVertex = vertices.get(neighbour);

                    if (null != neighbourVertex) {

                        if(!closedList.includes(neighbour)) {
                            if(!openList.includes(neighbour)) {
                                openList.push(neighbour);
                            }
                            let tentative_gScore = gScore.get(current) + haversine(
                                    {latitude: vertices.get(current).latitude, longitude: vertices.get(current).longitude},
                                    {latitude: neighbourVertex.latitude, longitude: neighbourVertex.longitude}
                                );
                            let neighbour_gScore = gScore.get(neighbour);
                            if (null == neighbour_gScore) {
                                neighbour_gScore = Number.POSITIVE_INFINITY;
                            }
                            if (tentative_gScore < neighbour_gScore) {
                                cameFrom.set(neighbour, current);
                                gScore.set(neighbour, tentative_gScore);
                                //heuristic cost estimate is geodistance between points
                                fScore.set(neighbour, gScore.get(neighbour) + haversine(
                                    {latitude: neighbourVertex.latitude, longitude: neighbourVertex.longitude},
                                    {latitude: vertices.get(dest).latitude, longitude: vertices.get(dest).longitude}
                                    ));
                            }
                        }
                    }
                });
            }
        }
        // no other routes to consider
        return [];
    }

    // reverse-plots final route
    function reconstructPath(cameFrom: Map<number, number>, current: number) : number[] {
        let totalPath : number[] = [];
        totalPath.push(current);
        let node = current;
        while (cameFrom.has(node)) {
            node = cameFrom.get(node);
            totalPath.push(node);
        }
        return totalPath.reverse();
    }
}
export {AStarRouteSearch}