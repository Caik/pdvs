export abstract class Serializable<T> {
	public fromJSON(json: Partial<T>): T {
		return Object.assign(this, JSON.parse(JSON.stringify(json)));
	}
}
