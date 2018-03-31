import { attachControllers } from "@decorators/express";
import * as bodyParser from "body-parser";
import { Express, NextFunction, Request, Response } from "express";
import * as express from "express";
import * as helmet from "helmet";

import {
	ControllersRegistry,
	ResourcesRegistry
} from "../../lib/controller/ControllerModule";
import { PDVController } from "../controllers/PDVController";

export class App {
	public expressApp: Express;

	constructor() {
		this.expressApp = express();
		this.setBaseMiddlewares();
		this.loadControllers();
		this.configDatabase();
		this.setDefaultNotFoundRoute();
	}

	private setBaseMiddlewares(): void {
		this.expressApp.use(helmet());
		this.expressApp.use(
			bodyParser.urlencoded({
				extended: true
			})
		);
		this.expressApp.use(bodyParser.json());
	}

	private loadControllers(): void {
		require("../config/Controllers");
		attachControllers(
			this.expressApp,
			ControllersRegistry.getControllers()
		);
	}

	private configDatabase(): void {
		require("../config/Database");
	}

	private setDefaultNotFoundRoute(): void {
		this.expressApp.use((req: Request, res: Response) => {
			res.status(404).json({
				statusCode: 404,
				error: "Not Found",
				message: "URL not found",
				links: [
					ResourcesRegistry.getResourceAsLink(
						PDVController.PDVS_RESOURCE,
						req
					)
				]
			});
		});
	}
}

const app = new App();

export default app;
