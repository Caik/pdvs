import { readFileSync } from "fs";

import { IAddress } from "../../src/app/interface/IAdress";
import { IPDV } from "../../src/app/interface/IPDV";

export class DataTestUtils {
	private static _fileData;

	public static getPDVDefaultList(): IPDV[] {
		return DataTestUtils.getFileData().defaultList;
	}

	public static getPDVDefaultByIndex(i: number): IPDV {
		return DataTestUtils.getPDVDefaultList()[i];
	}

	public static getSearchCaseList(): IPDV[] {
		return DataTestUtils.getFileData().searchCase;
	}

	public static getSearchCasePoints(): IAddress[] {
		return DataTestUtils.getFileData().searchCasePoints;
	}

	public static getNewPDV(): IPDV {
		return DataTestUtils.getFileData().newPDV;
	}

	private static getFileData() {
		if (!DataTestUtils._fileData) {
			const dt: Buffer = readFileSync(
				__dirname + "/../../data/test/pdvsTest.json"
			);

			DataTestUtils._fileData = JSON.parse(dt.toString());
		}

		return DataTestUtils._fileData;
	}
}
