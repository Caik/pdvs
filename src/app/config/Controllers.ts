import { attachControllers } from "@decorators/express";
import { readdirSync } from "fs";

const basePath = "../controller/";
const files = readdirSync(__dirname + "/" + basePath);

for (const file of files) {
	const filePath = basePath + file.replace(/\..+$/, "");
	console.log("Loading controller: " + filePath);
	require(filePath);
}
