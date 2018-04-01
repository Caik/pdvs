import { IAddress } from "./IAdress";
import { ICoverageArea } from "./ICoverageArea";

export interface IPDV {
	id?: number;

	tradingName: string;

	ownerName: string;

	document: string;

	coverageArea: ICoverageArea;

	address: IAddress;
}
