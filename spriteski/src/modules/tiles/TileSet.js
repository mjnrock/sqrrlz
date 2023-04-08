import { Tile } from "./Tile.js";

export class TileSet extends Tile {
	constructor ({ source, id, tags, ...rest } = {}) {
		super({ source, id, tags, ...rest });

		if(source) {
			this.width = source ? source.width : 0;
			this.height = source ? source.height : 0;
		}

		this.tiles = new Map();
	}

	get rows() {
		return Array.from(this.tiles.keys()).reduce((max, key) => {
			let row = ~~key.split(",")[ 1 ];

			return row > max ? row : max;
		}, -1) + 1;
	}
	get columns() {
		return Array.from(this.tiles.keys()).reduce((max, key) => {
			let col = ~~key.split(",")[ 0 ];

			return col > max ? col : max;
		}, -1) + 1;
	}

	asArray() {
		let rows = this.rows,
			columns = this.columns;

		let array = [];
		for(let y = 0; y < rows; y++) {
			let row = [];
			for(let x = 0; x < columns; x++) {
				row.push(this.getTileAt(x, y));
			}

			array.push(row);
		}

		return array;
	}

	setTile(key, tile) {
		this.tiles.set(key, tile);

		return this;
	}
	removeTile(key) {
		this.tiles.delete(key);

		return this;
	}

	getTile(key) {
		return this.tiles.get(key);
	}
	getTileAt(tx, ty) {
		return this.tiles.get(`${ tx },${ ty }`);
	}
};

export default TileSet;