import { PDV } from "../entities/PDV";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { PDVRepository } from "../repositories/PDVRepository";

export class PVDService {
	public static async getPDVs(): Promise<PDV[]> {
		const pdvs = await PDVRepository.getPDVs();

		return pdvs.map(pdv => new PDV().fromJSON(pdv));
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
