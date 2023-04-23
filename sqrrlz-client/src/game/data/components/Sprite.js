import * as PIXI from "pixi.js";

export class Sprite {
	constructor ({ texture } = {}) {
		this.sprite = new PIXI.Sprite(texture);
	}
};