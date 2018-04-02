import { ILink } from "../../lib/controller/ControllerModule";
import { ISerializable } from "../../lib/interface/ISerializable";
import { IAddress } from "../interface/IAdress";
import { ICoverageArea } from "../interface/ICoverageArea";
import { IPDV } from "../interface/IPDV";

export class PDV implements ISerializable<PDV>, IPDV {
	private _objectId;

	private _id;

	private _name: string;

	private _tradingName: string;

	private _ownerName: string;

	private _document: string;

	private _coverageArea: ICoverageArea;

	private _address: IAddress;

	/**
	 * Getter objectId
	 * @return {string}
	 */
	public get objectId(): string {
		return this._objectId;
	}

	/**
	 * Setter id
	 * @param {string} value
	 */
	public set objectId(value: string) {
		this._objectId = value;
	}

	/**
	 * Getter id
	 * @return {string}
	 */
	public get id(): number {
		return this._id;
	}

	/**
	 * Setter id
	 * @param {string} value
	 */
	public set id(value: number) {
		this._id = value;
	}

	/**
	 * Getter name
	 * @return {string}
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Setter name
	 * @param {string} value
	 */
	public set name(value: string) {
		this._name = value;
	}

	/**
	 * Getter tradingName
	 * @return {string}
	 */
	public get tradingName(): string {
		return this._tradingName;
	}

	/**
	 * Setter tradingName
	 * @param {string} value
	 */
	public set tradingName(value: string) {
		this._tradingName = value;
	}

	/**
	 * Getter ownerName
	 * @return {string}
	 */
	public get ownerName(): string {
		return this._ownerName;
	}

	/**
	 * Setter ownerName
	 * @param {string} value
	 */
	public set ownerName(value: string) {
		this._ownerName = value;
	}

	/**
	 * Getter document
	 * @return {string}
	 */
	public get document(): string {
		return this._document;
	}

	/**
	 * Setter document
	 * @param {string} value
	 */
	public set document(value: string) {
		this._document = value;
	}

	/**
	 * Getter coverageArea
	 * @return {ICoverageArea}
	 */
	public get coverageArea(): ICoverageArea {
		return this._coverageArea;
	}

	/**
	 * Setter coverageArea
	 * @param {ICoverageArea} value
	 */
	public set coverageArea(value: ICoverageArea) {
		this._coverageArea = value;
	}

	/**
	 * Getter address
	 * @return {IAddress}
	 */
	public get address(): IAddress {
		return this._address;
	}

	/**
	 * Setter address
	 * @param {IAddress} value
	 */
	public set address(value: IAddress) {
		this._address = value;
	}

	public fromJSON(json: Partial<PDV>): PDV {
		Object.assign(this, JSON.parse(JSON.stringify(json)));

		return this;
	}

	public toJson(): IPDV {
		return {
			objectId: this._objectId,
			id: this._id,
			tradingName: this._tradingName,
			ownerName: this._ownerName,
			document: this._document,
			coverageArea: {
				type: this._coverageArea.type,
				coordinates: this._coverageArea.coordinates
			},
			address: {
				type: this._address.type,
				coordinates: this._address.coordinates
			}
		};
	}
}
