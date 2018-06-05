import {Route} from '../models/Route';

module RouteHelper {
    export function constructFlightPath(routes : Map<number, Route[]>, path : number[]) : Route[] {
    let finalRoute : Route[] = [];
    for ( let i = 0; i < path.length - 1; i++) {
        let edges = routes.get(path[i]);
        for (let j = 0; j < edges.length; j++) {
            let edge = edges[j];
            if (edge.destid == path[i+1].toString()) {
                finalRoute.push(edge); // only get first instance in case of multiple flight options
                break;
            }
        }
    }
    return finalRoute;
}
}
export {RouteHelper}