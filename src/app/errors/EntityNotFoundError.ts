export class EntityNotFoundError extends Error {
	private statusCode: number;

	constructor(entity: string, entityId: string, statusCode: number) {
		super();
		this.name = `${entity} Not Found`;
		this.message = `The ${entity.toLowerCase()} requested (id: ${entityId}) doesn't exist.`;
		this.statusCode = statusCode;
	}
}
