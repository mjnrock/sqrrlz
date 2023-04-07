import { Base64 } from "./Base64.js";
import { Identity } from "./Identity.js";

export class Tile extends Identity {
	static async Factory({ source, id, tags, ...rest } = {}) {
		let tile = new this({ id, tags, ...rest }),
			canvas = await Base64.Decode(source);

		tile.width = canvas.width;
		tile.height = canvas.height;

		await tile.paint(canvas);

		return tile;
	}

	constructor ({ source, width = 32, height = 32, id, tags } = {}) {
		super({ id, tags });

		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext("2d");

		this.width = width;
		this.height = height;

		if(source) {
			this.paint(source);
		}
	}

	async paint(source, a0 = 0, a1 = 0, ...args) {
		let canvas = await Base64.Decode(source);

		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.ctx.drawImage(canvas, a0, a1, ...args);

		return canvas;
	}
};

export default Tile;