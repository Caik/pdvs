import {
	Controller,
	Get,
	Params,
	Post,
	Request,
	Response
} from "@decorators/express";
import { Type } from "@decorators/express/lib/src/middleware";
import { Router } from "express";
import * as express from "express";
import * as url from "url";

import {
	BaseController,
	ILink,
	Resource
} from "../../lib/controller/ControllerModule";
import { HttpMethodsEnum } from "../../lib/utils/HttpMethodsEnum";
import { PDV } from "../entities/PDV";
import { EntityNotFoundError } from "../errors/EntityNotFoundError";
import { PVDService } from "../services/PDVService";

@Controller(PDVController.BASE_PATH)
export class PDVController extends BaseController {
	// Paths name
	public static readonly BASE_PATH: string = "/pdv";

	public static readonly PDVS_PATH: string = "/";

	public static readonly PDV_PATH: string = "/:id";

	public static readonly PDV_SEARCH_PATH: string = "/:lng,:lat";

	// Resources name
	public static readonly PDVS_RESOURCE: string = "pdvs";

	public static readonly PDVS_CREATE_RESOURCE: string = "pdvs:create";

	public static readonly PDV_RESOURCE: string = "pdvs.pdv";

	public static readonly PDV_SEARCH_RESOURCE: string = "pdvs.pdv:search";

	constructor() {
		super();
	}

	@Get(PDVController.PDVS_PATH)
	public getPDVs(
		@Request() req: express.Request,
		@Response() res: express.Response
	) {
		// implement
	}

	@Post(PDVController.PDVS_PATH)
	public addPDV(
		@Request() req: express.Request,
		@Response() res: express.Response
	) {
		// implement
	}

	@Get(PDVController.PDV_PATH)
	public getPDV(
		@Params("id") id: string,
		@Request() req: express.Request,
		@Response() res: express.Response
	) {
		// implement
	}

	@Get(PDVController.PDV_SEARCH_PATH)
	public getPDVByLngLat(
		@Params("lng") lng: number,
		@Params("lat") lat: number,
		@Request() req: express.Request,
		@Response() res: express.Response
	) {
		// implement
	}

	protected getType(): Type {
		return PDVController;
	}

	protected getBasePath(): string {
		return PDVController.BASE_PATH;
	}
	protected getResourcesMap(): Resource[] {
		const resources: Resource[] = [];

		resources.push(
			new Resource(
				PDVController.PDVS_RESOURCE,
				PDVController.BASE_PATH,
				PDVController.PDVS_PATH,
				HttpMethodsEnum.GET
			)
		);

		resources.push(
			new Resource(
				PDVController.PDVS_CREATE_RESOURCE,
				PDVController.BASE_PATH,
				PDVController.PDVS_PATH,
				HttpMethodsEnum.POST
			)
		);

		resources.push(
			new Resource(
				PDVController.PDV_RESOURCE,
				PDVController.BASE_PATH,
				PDVController.PDV_PATH,
				HttpMethodsEnum.GET
			)
		);

		resources.push(
			new Resource(
				PDVController.PDV_SEARCH_RESOURCE,
				PDVController.BASE_PATH,
				PDVController.PDV_SEARCH_PATH,
				HttpMethodsEnum.PUT
			)
		);

		return resources;
	}
}

const pdvController = new PDVController();

export default pdvController;
