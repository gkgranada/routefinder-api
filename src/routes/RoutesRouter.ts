import {Router, Request, Response, NextFunction} from 'express';
import db = require('../db/RoutesQueries');

export class RoutesRouter {
	router: Router

	constructor() {
		this.router = Router();
		this.init();
	}

	/**
	 * Get all Routes
	 */
	public getAll(req: Request, res: Response, next: NextFunction) {
		db.routes.all(req, res, next);
	} 

	/**
	 * Attach handlers to ExpressRouter's endpoints
	 */
	init() {
		this.router.get('/', this.getAll)
	}

}

const routesRoutes = new RoutesRouter();
routesRoutes.init();

export default routesRoutes.router;
