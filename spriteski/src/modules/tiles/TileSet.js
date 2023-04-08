import { Tile } from "./Tile.js";

export class TileSet extends Tile {
	constructor ({ source, id, tags, ...rest } = {}) {
		super({ source, id, tags, ...rest });

		if(source) {
			this.width = source ? source.width : 0;
			this.height = source ? source.height : 0;
		}

		this.tiles = [];
	}

	addTile(tile) {
		this.tiles.push(tile);

		return this;
	}
	removeTile(index) {
		this.tiles.splice(index, 1);

		return this;
	}

	getTile(index) {
		return this.tiles[ index ];
	}
	getTileAt(tx, ty) {
		return this.tiles[ ty * this.width + tx ];
	}
};

export default TileSet;