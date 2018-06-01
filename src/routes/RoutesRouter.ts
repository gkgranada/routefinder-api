import {Router, Request, Response, NextFunction} from 'express';
import db = require('../db/RoutesQueries');
import{Airport} from '../models/Airport';
import {Route} from '../models/Route';

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
		db.routes.all(req, res, next);
	} 


	/**
	 * Get Best Route
	 */
	public getBestRoute(req: Request, res: Response, next: NextFunction) {
		let origin = req.query.origin;
		let dest = req.query.destination;
		console.log('origin: ' + origin)
		console.log('dest: ' + dest)

		let oAirport = db.airports.findByCode(origin);
		let dAirport = db.airports.findByCode(dest);

		let vertices:Map<number, Airport> = new Map<number, Airport>();
		let airports = db.airports.all(req, res, next).data;
		for (let a in airports) {
			let airport = JSON.parse(a)
			vertices.set(airport.id, airport);
		}

		let routes = db.routes.all(req, res, next).data;
		let edges:Map<number, number[]> = new Map<number, number[]>();
		for (let r in routes) {
			let route = JSON.parse(r);
			if (edges[route.sourceid] == undefined) {
				edges.set(route.sourceid, [route.destid]);
			} else {
				edges[route.sourceid].push(route.destid);
			}
		}

		console.log('edges: ' + edges)	
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
