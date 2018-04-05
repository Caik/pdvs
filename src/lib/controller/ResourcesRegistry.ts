import { Request } from "express";

import { ILink } from "./ILink";
import { Resource } from "./Resource";

export class ResourcesRegistry {
	private static resources: Resource[] = [];

	public static addResource(resource: Resource): void {
		if (ResourcesRegistry.getResource(resource.Name) === undefined) {
			ResourcesRegistry.resources.push(resource);
		}
	}

	public static removeResource(name: string): void {
		ResourcesRegistry.resources = ResourcesRegistry.resources.filter(
			t => t.Name !== name
		);
	}

	public static getResource(name: string): Resource | undefined {
		return ResourcesRegistry.resources.filter(t => t.Name === name)[0];
	}

	public static getResourceAsLink(
		name: string,
		req: Request,
		replaces?: Array<[string, string]>
	): ILink | undefined {
		const resource = ResourcesRegistry.getResource(name);

		if (!resource) {
			return;
		}

		return resource.getLink(req, replaces);
	}

	public static getResources(): Resource[] {
		return ResourcesRegistry.resources;
	}
}
