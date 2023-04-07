import { Tile } from "./Tile.js";

export class TileSet extends Tile {
	constructor ({ source, id, tags } = {}) {
		super({ source, id, tags });

		this.width = source ? source.width : 0;
		this.height = source ? source.height : 0;

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
};

export default TileSet;