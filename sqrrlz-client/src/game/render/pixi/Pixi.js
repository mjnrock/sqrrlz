import * as PIXI from "pixi.js";
import Identity from "../../util/Identity";

export class Pixi extends Identity {
	constructor ({ id, tags = [], config } = {}) {
		super({ id, tags });

		this.app = new PIXI.Application(config || {
			width: 800,
			height: 600,
			backgroundColor: 0x1099bb,
		});
	}
}