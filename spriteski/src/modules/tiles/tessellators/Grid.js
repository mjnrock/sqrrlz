import { Tile } from "./../Tile.js";
import { TileSet } from "../TileSet.js";

export async function byGrid({ source, isRowXCol = true, tileWidth = 32, tileHeight = 32 }) {
	const tileset = await TileSet.Factory({ source });

	function makeTile(row, col) {
		let x = col / tileWidth,
			y = row / tileHeight;

		return Tile.Factory({
			source: [ tileset.canvas, col, row, tileWidth, tileHeight, 0, 0, tileWidth, tileHeight ],
			width: tileWidth,
			height: tileHeight,
			tags: [ `${ x },${ y }` ],
		});
	}

	if(isRowXCol) {
		// LTR-TTB
		for(let row = 0; row < tileset.height; row += tileHeight) {
			for(let col = 0; col < tileset.width; col += tileWidth) {
				tileset.addTile(await makeTile(row, col));
			}
		}
	} else {
		// TTB-LTR
		for(let col = 0; col < tileset.width; col += tileWidth) {
			for(let row = 0; row < tileset.height; row += tileHeight) {
				tileset.addTile(await makeTile(row, col));
			}
		}
	}

	return tileset;
};

export default {
	byGrid,
};