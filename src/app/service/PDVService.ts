import { validate, ValidationError } from "class-validator";
import { PDV } from "../entity/PDV";
import { DuplicatedEntry } from "../error/DuplicatedEntry";
import { EntityNotFoundError } from "../error/EntityNotFoundError";
import { InvalidInputError } from "../error/InvalidInputError";
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
				throw new InvalidInputError(["id"], 400);
			}

			pdv = await PDVRepository.getPDVByProperties({
				id: parseInt(id, 10)
			});
		}

		if (!pdv) {
			throw new EntityNotFoundError("PDV", ["id"], 404);
		}

		return new PDV().fromJSON(pdv).toJson();
	}

	public static async searchNearestPDV(
		lng: string,
		lat: string
	): Promise<IPDV> {
		let pdv: IPDV;
		let lngFloat: number;
		let latFloat: number;
		const regex: RegExp = /^[\+\-]?[0-9]+(\.[0-9]+)?$/;

		if (!lng || !lat) {
			throw new InvalidInputError(["longitude", "latitude"], 400);
		}

		if (!lng.match(regex) || !lat.match(regex)) {
			throw new InvalidInputError(["longitude", "latitude"], 400);
		}

		lngFloat = parseFloat(lng);
		latFloat = parseFloat(lat);

		if (
			lngFloat < -180 ||
			lngFloat > 180 ||
			latFloat < -90 ||
			latFloat > 90
		) {
			throw new InvalidInputError(["longitude", "latitude"], 400);
		}

		try {
			pdv = await PDVRepository.searchNearestPDV(lngFloat, latFloat);
		} catch (error) {
			throw new InvalidInputError(["longitude", "latitude"], 400);
		}

		if (!pdv) {
			throw new EntityNotFoundError(
				"PDV",
				["longitude", "latidude"],
				404
			);
		}

		return new PDV().fromJSON(pdv).toJson();
	}

	public static async addPDV(pdv: PDV): Promise<PDV> {
		let validation: ValidationError[];
		let pdvNew: IPDV;

		try {
			validation = await validate(pdv);
		} catch (error) {
			throw new InvalidInputError(["PDV"], 400);
		}

		if (validation.length !== 0) {
			throw new InvalidInputError(["PDV"], 400);
		}

		try {
			pdvNew = await PDVRepository.addPDV(pdv.toJson());
		} catch (error) {
			throw new DuplicatedEntry("document", 409);
		}

		return new PDV().fromJSON(pdvNew);
	}
}
