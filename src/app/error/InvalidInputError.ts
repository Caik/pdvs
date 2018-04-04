export class InvalidInputError extends Error {
	private statusCode: number;

	constructor(properties: string[], statusCode: number) {
		super();

		let props: string = "";
		const propLength: number = properties.length;

		properties.forEach((value, i) => {
			props += `${
				propLength > 2 && i + 1 < propLength && i !== 0 ? "," : ""
			} ${
				propLength > 1 && i + 1 === propLength ? "or " : ""
			}${value.replace(/(?:^|\s)\S/g, a => a.toUpperCase())}`;
		});

		props = props.replace(/^ /, "");

		this.name = "Invalid Input";
		this.message = `Invalid ${props} supplied`;
		this.statusCode = statusCode;
	}
}
