export class InvalidParameterError extends Error {
	private statusCode: number;

	constructor(parameter: string, statusCode: number) {
		super();
		this.name = "Invalid Input";
		this.message = `Invalid ${parameter.replace(/(?:^|\s)\S/g, a =>
			a.toUpperCase()
		)} supplied`;
		this.statusCode = statusCode;
	}
}
