import { validate, ValidationError } from "class-validator";
import { PDV } from "../entity/PDV";
import { DuplicatedEntry } from "../error/DuplicatedEntry";
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

	public static async getPDV(id: string): Promise<IPDV> {
		let isObjectId: boolean = false;
		let pdv: IPDV;

		if (id.length === 24) {
			isObjectId = true;
			pdv = await PDVRepository.getPDVbyId(id);
		}

		if (!isObjectId) {
			if (!id.match(/^[0-9]+$/)) {
				throw new InvalidParameterError("id", 400);
			}

			pdv = await PDVRepository.getPDVByProperties({
				id: parseInt(id, 10)
			});
		}

		if (!pdv) {
			return;
		}

		return new PDV().fromJSON(pdv).toJson();
	}

	public static async searchNearestPDV(
		lng: string,
		lat: string
	): Promise<IPDV> {
		// Tratar errors

		const pdv = await PDVRepository.searchNearestPDV(parseFloat(lng), parseFloat(lat));

		if (!pdv) {
			return;
		}

		return new PDV().fromJSON(pdv).toJson();
	}

	public static async addPDV(pdv: PDV): Promise<PDV> {
		let validation: ValidationError[];
		let pdvNew: IPDV;

		try {
			validation = await validate(pdv);
		} catch (error) {
			throw new InvalidParameterError("PDV", 400);
		}

		if (validation.length !== 0) {
			throw new InvalidParameterError("PDV", 400);
		}

		try {
			pdvNew = await PDVRepository.addPDV(pdv.toJson());
		} catch (error) {
			throw new DuplicatedEntry("document", 409);
		}

		return new PDV().fromJSON(pdvNew);
	}
}
