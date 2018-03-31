import { createConnection } from "typeorm";

createConnection({
	type: "mongodb",
	host: "localhost",
	port: parseInt(process.env.DB_CONTAINER_PORT, 10) || 27017,
	database: process.env.DB_DATABASE_NAME || "teste",
	entities: [__dirname + "/../models/**"],
	dropSchema: false,
	synchronize: true,
	logging: true
})
	.then(() => console.log("Connected with database successfully"))
	.catch(error => console.log(error));
