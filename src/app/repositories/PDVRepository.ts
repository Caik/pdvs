import { PDV } from "../entities/PDV";
import { IPDV } from "../interfaces/IPDV";
import pdvModel from "../models/PDVModel";

export class PDVRepository {
	public static getPDVs(): Promise<IPDV[]> {
		return pdvModel.find().exec();
	}

	public static countPDVs(): Promise<number> {
		return pdvModel.count({}).exec();
	}

	public static getPDV(id: number): Promise<IPDV> {
		return pdvModel.findById(id).exec();
	}

	public static searchNearestPDV(lng: number, lat: number): Promise<IPDV> {
		// to implement
		return;
	}

	public static addPDV(pdv: PDV): Promise<IPDV> {
		return pdvModel.create(pdv);
	}
}
