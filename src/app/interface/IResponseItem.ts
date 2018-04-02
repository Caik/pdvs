import { ILink } from "../../lib/controller/ILink";

export interface IResponseItem<T> {
	statusCode: number;
	item: T;
	links: ILink[];
}
