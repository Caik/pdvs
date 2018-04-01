import { connect, connection } from "mongoose";

connect(
	`mongodb://db:${process.env.DB_CONTAINER_PORT || 27017}/${process.env
		.DB_DATABASE_NAME || "api"}`
).catch(error => {
	console.error(error);
	console.log("Error on database connect");
});

export const db = connection;
db.once("open", () => console.log("Connected to database successfully"));
