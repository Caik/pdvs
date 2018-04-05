import * as express from "express";

import { App } from "./app/base/App";
import appInstance from "./app/base/App";

class Server {
	constructor(app: App) {
		const port = this.normalizePort(process.env.API_CONTAINER_PORT || 9000);

		app.expressApp.listen(port, () =>
			console.log(`Server listening on port ${port}`)
		);
	}

	private normalizePort(val: number | string): number | string | boolean {
		const port: number = typeof val === "string" ? parseInt(val, 10) : val;

		if (isNaN(port)) {
			return val;
		}

		if (port > 0) {
			return port;
		}

		return false;
	}
}

const server = new Server(appInstance);
