export class InvalidParameterError extends Error {
	private statusCode: number;

	constructor(entity: string, parameter: string, statusCode: number) {
		super();
		this.name = "Invalid Parameter";
		this.message = `Invalid passed parameter: Entity: ${entity}, Parameter: ${parameter}.`;
		this.statusCode = statusCode;
	}
}
