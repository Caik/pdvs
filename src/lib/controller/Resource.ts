import { Request } from "express";
import * as url from "url";

import { ILink } from "./ILink";

export class Resource {
	private name: string;

	private basePath: string;

	private relativePath: string;

	private method: string;

	constructor(
		name: string,
		basePath: string,
		relativePath: string,
		method: string
	) {
		this.name = name;
		this.basePath = basePath;
		this.relativePath = relativePath;
		this.method = method;
	}

	public get Name(): string {
		return this.name;
	}

	public set Name(name: string) {
		this.name = name;
	}

	public get BasePath(): string {
		return this.basePath;
	}

	public set BasePath(basePath: string) {
		this.basePath = basePath;
	}

	public get RelativePath(): string {
		return this.relativePath;
	}

	public set RelativePath(relativePath: string) {
		this.relativePath = relativePath;
	}

	public get Method(): string {
		return this.method;
	}

	public set Method(method: string) {
		this.method = method;
	}

	public getLink(
		req: Request,
		replaces: Array<[string, string]> = []
	): ILink {
		let pathName = this.basePath
			.concat(this.relativePath)
			.replace(/\/$/, "");

		replaces.forEach(replace => {
			pathName = pathName.replace(`:${replace[0]}`, replace[1]);
		});

		return {
			rel: this.name,
			href: url.format({
				protocol: req.protocol,
				host: req.get("host"),
				pathname: pathName
			}),
			method: this.method
		};
	}
}
