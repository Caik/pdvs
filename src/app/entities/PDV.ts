import { Serializable } from "../../lib/class/Serializable";
import { ILink } from "../../lib/controller/ControllerModule";
import { IAddress } from "../interfaces/IAdress";
import { ICoverageArea } from "../interfaces/ICoverageArea";
import { IPDV } from "../interfaces/IPDV";

export class PDV extends Serializable<PDV> implements IPDV {
	private _id;

	private _name: string;

	private _tradingName: string;

	private _ownerName: string;

	private _document: string;

	private _coverageArea: ICoverageArea;

	private _address: IAddress;

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
}
