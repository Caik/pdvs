import { readFile } from "fs";
import { IPDV } from "../interface/IPDV";
import pdvModel from "../model/PDVModel";
import { PDVService } from "../service/PDVService";

if (process.env.DATA_POPULATE) {
	populate();
}

async function populate(): Promise<void> {
	let length: number;
	try {
		length = await PDVService.countPDVs();
	} catch (error) {
		console.error(error);
	}

	if (length === 0 || length === undefined) {
		readFile(__dirname + "/../../../data/pdvs.json", (err, dt) => {
			const data: IPDV[] = JSON.parse(dt.toString()).pdvs;

			pdvModel.insertMany(data).catch(error => console.error(error));
		});
	}
}
