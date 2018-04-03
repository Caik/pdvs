import { ObjectId } from "bson";
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

	public static async getPDVbyId(id: string): Promise<IPDV> {
		const pdv = await pdvModel
			.aggregate([
				{ $match: { _id: ObjectId.createFromHexString(id) } },
				{ $project: PDVRepository._selectDefault }
			])
			.exec();

		if (pdv.length === 0) {
			return;
		}

		return pdv[0];
	}

	public static async getPDVByProperties(
		properties: Partial<IPDV>
	): Promise<IPDV> {
		const pdv = await pdvModel
			.aggregate([
				{ $match: properties },
				{ $project: PDVRepository._selectDefault }
			])
			.exec();

		if (pdv.length === 0) {
			return;
		}

		return pdv[0];
	}

	public static searchNearestPDV(lng: number, lat: number): Promise<IPDV> {
		// to implement
		return;
	}

	public static addPDV(pdv: IPDV): Promise<IPDV> {
		return pdvModel.create(pdv);
	}
}
