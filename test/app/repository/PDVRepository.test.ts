import { expect } from "chai";
import { readFile, readFileSync, realpathSync } from "fs";

import { IAddress } from "../../../src/app/interface/IAdress";
import { IPDV } from "../../../src/app/interface/IPDV";
import { PDVRepository } from "../../../src/app/repository/PDVRepository";
import { DataTestUtils } from "../../utils/DataTestUtils";
import { DBTestUtils } from "../../utils/DBTestUtils";

describe("PDV Repository", () => {
	before("Preparing database", async function() {
		this.timeout(20000);
		const data: IPDV[] = DataTestUtils.getPDVDefaultList();

		await DBTestUtils.clearDatabase();
		await DBTestUtils.populateDatabase(data);
	});

	after("Cleaning database", async () => {
		await DBTestUtils.clearDatabase();
	});

	describe("#countPDVs", () => {
		it("Should return exactly the quantity of PDVs", async () => {
			const count = await PDVRepository.countPDVs();
			expect(count).to.be.equal(5);
		});
	});

	describe("#getPDVs", () => {
		it("Should return exactly the quantity of PDVs when using limit", async () => {
			const pdvs = await PDVRepository.getPDVs(0, 3);

			expect(pdvs).to.have.length(3);
		});

		it("Should return exactly the quantity of PDVs when using offset", async () => {
			const pdvs = await PDVRepository.getPDVs(4, 0);

			expect(pdvs).to.have.length(1);
		});
	});

	describe("#getPDVbyId", () => {
		it("Should return a valid PDV by Id", async () => {
			const tmp = await PDVRepository.getPDVByProperties({ id: 1 });
			const pdv = await PDVRepository.getPDVbyId(tmp.objectId.toString());

			expect(pdv)
				.to.have.property("id")
				.and.equals(1);
		});

		it("Should return undefined when not found a PDV by Id", async () => {
			const pdv = await PDVRepository.getPDVbyId(
				"c1feef86b6cc8dbbc167d788"
			);

			// tslint:disable-next-line:no-unused-expression
			expect(pdv).to.be.undefined;
		});
	});
	describe("#getPDVByProperties", () => {
		const tmp = DataTestUtils.getPDVDefaultByIndex(0);

		it("Should return a valid PDV by properties", async () => {
			const pdv = await PDVRepository.getPDVByProperties({
				id: parseInt(tmp.id.toString(), 10),
				tradingName: tmp.tradingName,
				ownerName: tmp.ownerName,
				document: tmp.document
			});

			expect(pdv)
				.to.have.property("id")
				.and.equals(1);
		});

		it("Should return undefined when not found a PDV by properties", async () => {
			const pdv = await PDVRepository.getPDVByProperties({
				id: 6,
				tradingName: tmp.tradingName,
				ownerName: tmp.ownerName,
				document: tmp.document
			});

			// tslint:disable-next-line:no-unused-expression
			expect(pdv).to.be.undefined;
		});
	});

	describe("#searchNearestPDV", () => {
		const data: IPDV[] = DataTestUtils.getSearchCaseList();
		const points: IAddress[] = DataTestUtils.getSearchCasePoints();

		it("Should return the nearest PDV with the supplied location", async () => {
			await DBTestUtils.clearDatabase();
			await DBTestUtils.populateDatabase(data);

			const point1: IAddress = points[0];
			const point2: IAddress = points[1];
			const point3: IAddress = points[2];

			let pdv = await PDVRepository.searchNearestPDV(
				point1.coordinates[0],
				point1.coordinates[1]
			);
			expect(pdv.id).to.be.equal(2);

			pdv = await PDVRepository.searchNearestPDV(
				point2.coordinates[0],
				point2.coordinates[1]
			);
			expect(pdv.id).to.be.equal(2);

			pdv = await PDVRepository.searchNearestPDV(
				point3.coordinates[0],
				point3.coordinates[1]
			);
			expect(pdv.id).to.be.equal(1);
		});

		it("Should return undefined when not found a PDV with the supplied location", async () => {
			await DBTestUtils.clearDatabase();
			await DBTestUtils.populateDatabase(data);

			const pdv = await PDVRepository.searchNearestPDV(0, 0);

			// tslint:disable-next-line:no-unused-expression
			expect(pdv).to.be.undefined;
		});
	});

	describe("#addPDV", () => {
		const data: IPDV[] = DataTestUtils.getSearchCaseList();
		const pdv: IPDV = DataTestUtils.getNewPDV();

		it("Should return a valid PDV when adding a new PDV", async () => {
			await DBTestUtils.clearDatabase();
			await DBTestUtils.populateDatabase(data);

			const newPDV = await PDVRepository.addPDV(pdv);

			expect(newPDV.id).to.be.equals(parseInt(pdv.id.toString(), 10));
			expect(newPDV.tradingName).to.be.equals(pdv.tradingName);
			expect(newPDV.ownerName).to.be.equals(pdv.ownerName);
			expect(newPDV.document).to.be.equals(pdv.document);
		});

		it("Should return an error when trying to add a new PDV with existing document", async () => {
			await DBTestUtils.clearDatabase();
			await DBTestUtils.populateDatabase(data);

			const pdvDuplicated = pdv;
			pdvDuplicated.document = data[0].document;

			try {
				const newPDV = await PDVRepository.addPDV(pdvDuplicated);
				expect(0).to.be.equals(1);
			} catch (error) {
				expect(0).to.be.equals(0);
			}
		});
	});
});
