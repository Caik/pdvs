import {
	Controller,
	Get,
	Params,
	Post,
	Query,
	Request,
	Response
} from "@decorators/express";
import { Type } from "@decorators/express/lib/src/middleware";
import { Router } from "express";
import * as express from "express";

import {
	BaseController,
	ILink,
	Resource
} from "../../lib/controller/ControllerModule";
import { HttpMethodsEnum } from "../../lib/util/HttpMethodsEnum";
import { PDV } from "../entity/PDV";
import { EntityNotFoundError } from "../error/EntityNotFoundError";
import { IPDV } from "../interface/IPDV";
import { IResponseList } from "../interface/IResponseList";
import { PDVService } from "../service/PDVService";

@Controller(PDVController.BASE_PATH)
export class PDVController extends BaseController {
	// Paths name
	public static readonly BASE_PATH: string = "/pdv";

	public static readonly PDVS_PATH: string = "/";

	public static readonly PDV_PATH: string = "/:id";

	public static readonly PDV_ALT_PATH: string = "/:objectId";

	public static readonly PDV_SEARCH_PATH: string = "/:lng,:lat";

	// Resources name
	public static readonly PDVS_RESOURCE: string = "pdvs";

	public static readonly PDVS_CREATE_RESOURCE: string = "pdvs:create";

	public static readonly PDV_RESOURCE: string = "pdvs.pdv";

	public static readonly PDV_ALT_RESOURCE: string = "pdvs.pdv_alt";

	public static readonly PDV_SEARCH_RESOURCE: string = "pdvs.pdv:search";

	constructor() {
		super();
	}

	@Get(PDVController.PDVS_PATH)
	public async getPDVs(
		@Request() req: express.Request,
		@Response() res: express.Response,
		@Query("offset") offset: string,
		@Query("limit") limit: string
	) {
		let pdvs: IPDV[];
		const links = this.getLinksResources(
			req,
			[
				PDVController.PDVS_RESOURCE,
				PDVController.PDVS_CREATE_RESOURCE,
				PDVController.PDV_SEARCH_RESOURCE
			],
			[["lng", "LNG"], ["lat", "LAT"]]
		);

		try {
			pdvs = await PDVService.getPDVs(offset, limit);
		} catch (error) {
			console.log(error);
			res.status(500).json({
				statusCode: 500,
				error: "Internal Server Error",
				message: "A error has occurred, please try again latter",
				links
			});
			return;
		}

		pdvs.map(pdv => {
			Object.defineProperty(pdv, "objectId", {
				enumerable: false
			});

			Object.assign(pdv, {
				links: this.getLinksResources(
					req,
					[
						PDVController.PDV_RESOURCE,
						PDVController.PDV_ALT_RESOURCE
					],
					[["id", pdv.id.toString()], ["objectId", pdv.objectId]]
				)
			});
		});

		const response: IResponseList<IPDV> = {
			statusCode: 200,
			qty: await PDVService.countPDVs(),
			itens: pdvs,
			links
		};

		res.status(200).json(response);
	}

	@Post(PDVController.PDVS_PATH)
	public addPDV(
		@Request() req: express.Request,
		@Response() res: express.Response
	) {
		res.status(200).json({ ok: "/POST" });
	}

	@Get(PDVController.PDV_SEARCH_PATH)
	public getPDVByLngLat(
		@Params("lng") lng: string,
		@Params("lat") lat: string,
		@Request() req: express.Request,
		@Response() res: express.Response
	) {
		res.status(200).json({ ok: "/:lng,:lat", lng, lat });
	}
	@Get(PDVController.PDV_PATH)
	public getPDV(
		@Params("id") id: string,
		@Request() req: express.Request,
		@Response() res: express.Response
	) {
		res.status(200).json({ ok: "/:Id", id });
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
				PDVController.PDV_ALT_RESOURCE,
				PDVController.BASE_PATH,
				PDVController.PDV_ALT_PATH,
				HttpMethodsEnum.GET
			)
		);

		resources.push(
			new Resource(
				PDVController.PDV_SEARCH_RESOURCE,
				PDVController.BASE_PATH,
				PDVController.PDV_SEARCH_PATH,
				HttpMethodsEnum.GET
			)
		);

		return resources;
	}
}

const pdvController = new PDVController();

export default pdvController;
