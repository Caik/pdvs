export interface ISerializable<T> {
	fromJSON(json: Partial<T>): T;

	toJson();
}
