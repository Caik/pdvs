import { ILink } from "../../lib/controller/ILink";

export interface IResponseList<T> {
	statusCode: number;
	qty: number;
	itens: T[];
	links: ILink[];
}
