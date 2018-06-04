import {Router, Request, Response, NextFunction} from 'express';
import db = require('../db/RoutesQueries');
import{Airport} from '../models/Airport';
import {Route} from '../models/Route';
import {AStarRouteSearch} from '../helpers/AStarRouteSearch';

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
        console.log('origin: ' + origin);
        console.log('dest: ' + dest);
        let vertices:Map<number, Airport> = new Map<number, Airport>();
        let edges:Map<number, number[]> = new Map<number, number[]>();

        let originPromise = db.airports.findByCode(origin);
        let destPromise = db.airports.findByCode(dest);

        let verticesPromise = db.airports.all();
        let edgesPromise = db.routes.all(req, res, next);

        Promise.all([originPromise, destPromise, verticesPromise, edgesPromise]).then(function(values) {
            console.log(values[0]);
            console.log(values[1]);
            values[2].forEach(function(a){
                vertices.set(a.id, a);
            });
            //console.log(vertices);
            values[3].forEach(function(route){
                let src = parseInt(route.sourceid);
                let dst = parseInt(route.destid);
                if (undefined == edges.get(src)) {
                    edges.set(src, [dst]);
                } else {
                    edges.get(src).push(dst);
                }
            });
            //console.log(edges);

            let path = AStarRouteSearch.getShortestPath(
                    values[0].id,
                    values[1].id,
                    vertices,
                    edges);
            console.log(path);
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
