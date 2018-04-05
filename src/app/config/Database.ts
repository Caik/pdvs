import { connect, connection } from "mongoose";

connect(
	`mongodb://${process.env.DB_CONTAINER_HOST || "localhost"}:${process.env
		.DB_CONTAINER_PORT || 27017}/${process.env.DB_DATABASE_NAME || "api"}`
).catch(error => {
	console.log("Error on database connect");
	console.error(error);
});

export const db = connection;
db.once("open", () => {
	console.log("Connected to database successfully");

	if (process.env.DB_FORCE_DROP_DATABASE) {
		console.log("Dropping database (FORCE_DROP MODE ON))");
		connection.db.dropDatabase();
	}
});
