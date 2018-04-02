import { PDV } from "../entity/PDV";
import { IPDV } from "../interface/IPDV";
import pdvModel from "../model/PDVModel";

export class PDVRepository {
	private static _selectDefault = {
		id: 1,
		tradingName: 1,
		ownerName: 1,
		document: 1,
		coverageArea: 1,
		address: 1,
		_id: 0,
		objectId: "$_id"
	};

	public static getPDVs(offset: number, limit: number): Promise<IPDV[]> {
		let query = pdvModel.aggregate([
			{ $project: PDVRepository._selectDefault }
		]);

		if (offset) {
			query = query.skip(offset);
		}

		if (limit) {
			query = query.limit(limit);
		}

		return query.exec();
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
