export class EntityNotFoundError extends Error {
	private statusCode: number;

	constructor(entity: string, properties: string[], statusCode: number) {
		super();

		let props: string = "";
		const propLength: number = properties.length;

		properties.forEach((value, i) => {
			props += `${
				propLength > 2 && i + 1 < propLength && i !== 0 ? "," : ""
			} ${
				propLength > 1 && i + 1 === propLength ? "and " : ""
			}${value.replace(/(?:^|\s)\S/g, a => a.toUpperCase())}`;
		});

		props = props.replace(/^ /, "");

		this.name = `${entity} Not Found`;
		this.message = `None ${entity} found with ${props} supplied`;
		this.statusCode = statusCode;
	}
}
