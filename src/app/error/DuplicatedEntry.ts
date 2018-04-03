export class DuplicatedEntry extends Error {
	private statusCode: number;

	constructor(property: string, statusCode: number) {
		super();
		this.name = "Duplicated Entry";
		this.message = `Duplicated entry for ${property.replace(
			/(?:^|\s)\S/g,
			a => a.toUpperCase()
		)}`;
		this.statusCode = statusCode;
	}
}
