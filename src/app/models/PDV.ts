import { Entity, ObjectIdColumn } from "typeorm";

import { ILink } from "../../lib/controller/ControllerModule";

@Entity("PDV")
export class PDV {
	@ObjectIdColumn() private _id: number;
}
