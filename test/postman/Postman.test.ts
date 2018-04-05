import { expect } from "chai";

const newman = require("newman");

describe("Postman", () => {
	it("Should pass all the Postman's Tests", () => {
		newman
			.run({
				collection: require(__dirname +
					"/../../data/test/postman_tests.json"),
				// reporters: "cli",
				globals: {
					id: "f55852f4-a767-4722-8411-25457ece4e99",
					name: "Postman Globals",
					values: [
						{
							id: "f55852f4-a767-4722-8411-25457ece4e99",
							key: "url",
							value:
								"api_sut:" +
								process.env.API_TEST_CONTAINER_PORT,
							type: "string"
						}
					],
					_postman_variable_scope: "globals"
				}
			})
			.on("done", (err, summary) => {
				const ok = !(
					err ||
					summary.error ||
					summary.run.failures.length !== 0
				);

				// tslint:disable-next-line:no-unused-expression
				expect(ok).to.be.true;
			});
	});
});
