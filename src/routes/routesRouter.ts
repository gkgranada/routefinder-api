import {Router, Request, Response, NextFunction} from 'express';
import db = require('../db/routesQueries');
import {Airport} from '../models/airport';
import {Route} from '../models/route';
import {AStarRouteSearch} from '../helpers/aStarRouteSearch';
import {RouteHelper} from '../helpers/routeHelper';

export class RoutesRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * Get all Routes
     */
    public getRoutes(req: Request, res: Response, next: NextFunction) {
        db.routes.all(req, res, next)
        .then(function (data) {
          res.status(200)
            .json({
              status: 'success',
              data: data,
              message: 'Retrieved ALL routes'
            });
        })
        .catch(function (err) {
          return next(err);
        });
    }


    /**
     * Get Best Route
     */
    public getBestRoute(req: Request, res: Response, next: NextFunction) {
        let origin = req.query.origin;
        let dest = req.query.destination;

        // validate request params
        if (!origin) {
            return res.status(500)
            .send({
                status:'error',
                message: 'Missing origin airport code'
            });
        }
        if (!dest){
            return res.status(500)
            .send({
                status:'error',
                message: 'Missing destination airport code'
            });
        }

        if(origin == dest) {
            return res.status(500)
            .send({
                status:'error',
                message: 'Origin and destination airports are the same'
            });
        }

        let vertices:Map<number, Airport> = new Map<number, Airport>();
        let edges:Map<number, number[]> = new Map<number, number[]>();
        let routes:Map<number, Route[]> = new Map<number, Route[]>();

        let originPromise = db.airports.findByCode(origin);
        let destPromise = db.airports.findByCode(dest);

        let verticesPromise = db.airports.all();
        let edgesPromise = db.routes.all(req, res, next);

        Promise.all([originPromise, destPromise, verticesPromise, edgesPromise])
        .then(function(values) {

            // Validate promise values
            let oAirport = values[0];
            if (!oAirport) {
                return res.status(500)
                .json({
                    status:'error',
                    message: 'Airport not found: ' + origin
                });
            }

            let dAirport = values[1];
            if (!dAirport) {
                return res.status(500)
                .json({
                    status:'error',
                    message: 'Airport not found: ' + dest
                });
            }

            values[2].forEach(function(a){
                vertices.set(a.id, a);
            });
            values[3].forEach(function(route){
                let src = parseInt(route.sourceid);
                let dst = parseInt(route.destid);
                if (undefined == edges.get(src)) {
                    edges.set(src, [dst]);
                    routes.set(src, [route]);
                } else {
                    edges.get(src).push(dst);
                    routes.get(src).push(route);
                }
            });

            let path = AStarRouteSearch.getShortestPath(
                    oAirport.id,
                    dAirport.id,
                    vertices,
                    edges);

            // No path found (empty array)
            let message = '';
            let finalRoute : Route[] = [];
            if (!path || path.length == 0) {  
                message = 'Flight route not found';
            } else if (path.length > 5) {
                message = 'Flight route contains more than 4 legs';
            }else {
                message = 'Flight route found';

                finalRoute = RouteHelper.constructFlightPath(routes, path);
            }

            return res.status(200)
            .json({
              status: 'success',
              data: finalRoute,
              message: message
            });
        }).catch(function(error) {
          return next(error);
        });

    }

    /**
     * Attach handlers to ExpressRouter's endpoints
     */
    init() {
        this.router.get('/', this.getRoutes)
        this.router.get('/best/', this.getBestRoute)
    }

}

const routesRouter = new RoutesRouter;
export default routesRouter.router;
