import { connect, connection } from "mongoose";
import { IPDV } from "../../src/app/interface/IPDV";
import pdvModel from "../../src/app/model/PDVModel";

export class DBTestUtils {
	public static async dbConnect() {
		await connect(
			`mongodb://${process.env.DB_CONTAINER_HOST || "localhost"}:${process
				.env.DB_CONTAINER_PORT || 27017}/${process.env
				.DB_DATABASE_NAME || "test"}`
		).catch(error => {
			console.log("Error on database connect");
			console.error(error);
		});
	}
	public static async clearDatabase(): Promise<boolean> {
		await DBTestUtils.dbConnect();

		const result = await pdvModel.remove({});

		return result;
	}

	public static async populateDatabase(data: IPDV[]): Promise<void> {
		await DBTestUtils.dbConnect();

		return pdvModel
			.insertMany(data)
			.then(sucess => {
				return;
			})
			.catch(error => console.error(error));
	}
}
