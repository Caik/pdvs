import { Document, model, Schema } from "mongoose";

import { ObjectID } from "bson";
import { IPDV } from "../interface/IPDV";

type PDVType = IPDV & Document;

export default model<PDVType>(
	"pdv",
	new Schema({
		id: Number,
		tradingName: String,
		ownerName: String,
		document: { type: String, index: true, unique: true },
		coverageArea: {
			type: { type: String },
			coordinates: [[[[Number, Number]]]]
		},
		address: {
			type: { type: String },
			coordinates: [Number, Number]
		}
	})
);
