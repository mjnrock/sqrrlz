import { Base64 } from "./Base64.js";
import { Identity } from "./Identity.js";

export class Tile extends Identity {
	static async Factory({ source, id, tags, width, height, ...rest } = {}) {
		let tile = new this({ id, tags, width, height, ...rest }),
			canvas;

		if(Array.isArray(source)) {
			let [ c, ...args ] = source;

			canvas = await Base64.Decode(c);

			tile.width = width || canvas.width;
			tile.height = height || canvas.height;
	
			await tile.paint(canvas, ...args);
		} else {
			canvas = await Base64.Decode(source);

			tile.width = width || canvas.width;
			tile.height = height || canvas.height;
	
			await tile.paint(canvas);
		}

		return tile;
	}

	static Copy(tile) {
		let copy = new this();

		copy.width = tile.width;
		copy.height = tile.height;

		copy.canvas.width = copy.width;
		copy.canvas.height = copy.height;

		copy.ctx.drawImage(tile.canvas, 0, 0);

		return copy;
	}

	constructor ({ source, width = 32, height = 32, id, tags } = {}) {
		super({ id, tags });

		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext("2d");

		this.width = width;
		this.height = height;

		this.canvas.width = this.width;
		this.canvas.height = this.height;

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