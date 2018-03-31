import { getCustomRepository } from "typeorm";

import { InvalidParameterError } from "../errors/InvalidParameterError";
import { PDV } from "../models/PDV";
import { PDVRepository } from "../repositories/PDVRepository";

export class PVDService {
	public static getPDVs(): Promise<PDV[]> {
		return getCustomRepository(PDVRepository).getPDVs();
	}

	public static getPDV(id: string): Promise<PDV> {
		if (!id.match(/^[0-9]+$/)) {
			throw new InvalidParameterError("PDV", id, 404);
		}

		return getCustomRepository(PDVRepository).getPDV(parseInt(id, 10));
	}

	public static getPDVByLngLat(lng: number, lat: number): Promise<PDV> {
		return getCustomRepository(PDVRepository).getPDVByLngLat(lng, lat);
	}

	public static addPDV(pdv: PDV): Promise<PDV> {
		return getCustomRepository(PDVRepository).addPDV(pdv);
	}
}
