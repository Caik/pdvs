import { Type } from "@decorators/express/lib/src/middleware";
import * as express from "express";
import { Request } from "express";
import * as url from "url";

import { HttpMethodsEnum } from "../util/HttpMethodsEnum";
import { ControllersRegistry } from "./ControllerRegistry";
import { ILink } from "./ILink";
import { Resource } from "./Resource";
import { ResourcesRegistry } from "./ResourcesRegistry";

export abstract class BaseController {
	private resourcesMap: Resource[] = [];

	constructor() {
		ControllersRegistry.addController(this.getType());
		this.resourcesMap = this.getResourcesMap();

		this.resourcesMap.forEach(resource =>
			ResourcesRegistry.addResource(resource)
		);
	}

	protected abstract getType(): Type;

	protected abstract getBasePath(): string;

	protected abstract getResourcesMap(): Resource[];

	protected getLinksResources(
		req: Request,
		resources: string[],
		replaces: Array<[string, string]> = []
	): ILink[] {
		const links: ILink[] = [];

		const filteredResources = this.resourcesMap.filter(
			resource => resources.indexOf(resource.Name) !== -1
		);

		filteredResources.forEach(resource => {
			links.push(resource.getLink(req, replaces));
		});

		return links;
	}
}
