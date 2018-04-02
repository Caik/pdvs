import { PDV } from "../entity/PDV";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { IPDV } from "../interface/IPDV";
import { PDVRepository } from "../repository/PDVRepository";

export class PDVService {
	public static async getPDVs(
		offset: string,
		limit: string
	): Promise<IPDV[]> {
		let realOffset: number;
		let realLimit: number;

		if (offset !== undefined && offset.match(/^[0-9]+$/)) {
			realOffset = parseInt(offset, 10);
		}

		if (limit !== undefined && limit.match(/^[0-9]+$/)) {
			realLimit = parseInt(limit, 10);
		}

		const pdvs = await PDVRepository.getPDVs(realOffset, realLimit);

		return pdvs.map(pdv => new PDV().fromJSON(pdv).toJson());
	}

	public static countPDVs(): Promise<number> {
		return PDVRepository.countPDVs();
	}

	public static async getPDV(id: string): Promise<PDV> {
		if (!id.match(/^[0-9]+$/)) {
			throw new InvalidParameterError("PDV", id, 404);
		}

		const pdv = await PDVRepository.getPDV(parseInt(id, 10));

		if (!pdv) {
			return;
		}

		return new PDV().fromJSON(pdv);
	}

	public static async searchNearestPDV(
		lng: number,
		lat: number
	): Promise<PDV> {
		const pdv = await PDVRepository.searchNearestPDV(lng, lat);

		if (!pdv) {
			return;
		}

		return new PDV().fromJSON(pdv);
	}

	public static async addPDV(pdv: PDV): Promise<PDV> {
		const pdvNew = await PDVRepository.addPDV(pdv);

		if (!pdv) {
			return;
		}

		return new PDV().fromJSON(pdv);
	}
}
