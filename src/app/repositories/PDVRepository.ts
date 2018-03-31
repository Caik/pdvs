import { EntityRepository, FindOneOptions, Repository } from "typeorm";

import { PDV } from "../models/PDV";

@EntityRepository(PDV)
export class PDVRepository extends Repository<PDV> {
	public getPDVs(): Promise<PDV[]> {
		return this.find({
			order: { Id: "ASC" }
		});
	}

	public getPDV(id: number): Promise<PDV> {
		return this.findOneById(id);
	}

	public getPDVByLngLat(lng: number, lat: number): Promise<PDV> {
		// return this.findOne({
		// 	where: { email, deleted_flg: false }
		// });
		return;
	}

	public addPDV(pdv: PDV): Promise<PDV> {
		return this.save(pdv);
	}
}
