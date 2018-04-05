import { expect } from "chai";

import { PDV } from "../../../src/app/entity/PDV";
import { IPDV } from "../../../src/app/interface/IPDV";
import { PDVService } from "../../../src/app/service/PDVService";
import { DataTestUtils } from "../../utils/DataTestUtils";
import { DBTestUtils } from "../../utils/DBTestUtils";

describe("PDV Service", () => {
	before("Preparing database", async function() {
		this.timeout(20000);
		const data: IPDV[] = DataTestUtils.getPDVDefaultList();

		await DBTestUtils.clearDatabase();
		await DBTestUtils.populateDatabase(data);
	});

	after("Cleaning database", async () => {
		await DBTestUtils.clearDatabase();
	});

	describe("#getPDVs", () => {
		it("Should ignore offset if invalid", async () => {
			let pdvs = await PDVService.getPDVs(null, null);
			expect(pdvs).to.have.length(5);

			pdvs = await PDVService.getPDVs(undefined, null);
			expect(pdvs).to.have.length(5);

			pdvs = await PDVService.getPDVs("1.4", null);
			expect(pdvs).to.have.length(5);

			pdvs = await PDVService.getPDVs("x", null);
			expect(pdvs).to.have.length(5);

			pdvs = await PDVService.getPDVs("", null);
			expect(pdvs).to.have.length(5);
		});

		it("Should ignore limit if invalid", async () => {
			let pdvs = await PDVService.getPDVs(null, null);
			expect(pdvs).to.have.length(5);

			pdvs = await PDVService.getPDVs(null, undefined);
			expect(pdvs).to.have.length(5);

			pdvs = await PDVService.getPDVs(null, "1.4");
			expect(pdvs).to.have.length(5);

			pdvs = await PDVService.getPDVs(null, "x");
			expect(pdvs).to.have.length(5);

			pdvs = await PDVService.getPDVs(null, "");
			expect(pdvs).to.have.length(5);
		});
	});

	describe("#getPDV", () => {
		it("Should throw a 400 error if supplied id invalid", async () => {
			try {
				await PDVService.getPDV("i");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.getPDV("1.2");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.getPDV("");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.getPDV(null);
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.getPDV(undefined);
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.getPDV("1.2");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.getPDV("s1232131s2312312312231123");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}
		});

		it("Should throw a 404 error if PDV not found", async () => {
			try {
				await PDVService.getPDV("6");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(404);
			}

			try {
				await PDVService.getPDV("c1feef86b6cc8dbbc167d788");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(404);
			}
		});
	});

	describe("#searchNearestPDV", () => {
		it("Should throw a 400 error if supplied longitude invalid", async () => {
			try {
				await PDVService.searchNearestPDV(null, "2");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.searchNearestPDV(undefined, "2");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.searchNearestPDV("x", "2");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.searchNearestPDV("6x", "2");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.searchNearestPDV("5.", "2");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.searchNearestPDV(".6", "2");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.searchNearestPDV("6,4", "2");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.searchNearestPDV("-180.000001", "2");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.searchNearestPDV("180.000001", "2");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}
		});

		it("Should throw a 400 error if supplied latitude invalid", async () => {
			try {
				await PDVService.searchNearestPDV("2", null);
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.searchNearestPDV("2", undefined);
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.searchNearestPDV("2", "x");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.searchNearestPDV("2", "6x");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.searchNearestPDV("2", "5.");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.searchNearestPDV("2", ".6");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.searchNearestPDV("2", "6,4");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.searchNearestPDV("2", "-90.000001");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				await PDVService.searchNearestPDV("2", "90.000001");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}
		});

		it("Should throw a 404 error if PDV not found", async () => {
			try {
				await PDVService.searchNearestPDV("0", "0");
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(404);
			}
		});
	});

	describe("#addPDV", () => {
		const pdv: IPDV = DataTestUtils.getNewPDV();

		it("Should throw a 400 error if PDV supplied invalid", async () => {
			try {
				const pdvIncomplete: PDV = new PDV().fromJSON(pdv);
				pdvIncomplete.id = null;

				await PDVService.addPDV(pdvIncomplete);
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				const pdvIncomplete: PDV = new PDV().fromJSON(pdv);
				pdvIncomplete.tradingName = null;

				await PDVService.addPDV(pdvIncomplete);
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				const pdvIncomplete: PDV = new PDV().fromJSON(pdv);
				pdvIncomplete.ownerName = null;

				await PDVService.addPDV(pdvIncomplete);
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				const pdvIncomplete: PDV = new PDV().fromJSON(pdv);
				pdvIncomplete.document = null;

				await PDVService.addPDV(pdvIncomplete);
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				const pdvIncomplete: PDV = new PDV().fromJSON(pdv);
				pdvIncomplete.coverageArea = null;

				await PDVService.addPDV(pdvIncomplete);
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}

			try {
				const pdvIncomplete: PDV = new PDV().fromJSON(pdv);
				pdvIncomplete.address = null;

				await PDVService.addPDV(pdvIncomplete);
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(400);
			}
		});

		it("Should throw a 409 error if supplied PDV's document duplicated", async () => {
			try {
				const pdvDuplicated: PDV = new PDV().fromJSON(pdv);
				const dbPDV: IPDV = await PDVService.getPDV("1");

				pdvDuplicated.document = dbPDV.document;

				await PDVService.addPDV(pdvDuplicated);
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(error.statusCode).to.be.equals(409);
			}
		});
	});
});
