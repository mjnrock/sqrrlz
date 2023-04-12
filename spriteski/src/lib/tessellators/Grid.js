import { Tile } from "../tiles/Tile.js";
import { TileSet } from "../tiles/TileSet.js";
import Base64 from "../Base64.js";

export async function byGrid({ source, isRowXCol, tileWidth = 32, tileHeight = 32 }) {
	const canvas = await Base64.Decode(source);

	let tileset = new TileSet({
		width: isRowXCol ? canvas.width : canvas.height,
		height: isRowXCol ? canvas.height : canvas.width,
	});
	let ctx = tileset.canvas.getContext("2d");

	let rows = isRowXCol ? canvas.height / tileHeight : canvas.width / tileWidth,
		cols = isRowXCol ? canvas.width / tileWidth : canvas.height / tileHeight;

	for(let row = 0; row < rows; row++) {
		for(let col = 0; col < cols; col++) {
			let spx = isRowXCol ? col * tileWidth : row * tileHeight,
				spy = isRowXCol ? row * tileHeight : col * tileWidth;

			let sx = spx / (isRowXCol ? tileWidth : tileHeight),
				sy = spy / (isRowXCol ? tileHeight : tileWidth);

			let tile = await Tile.Factory({
				source: [ canvas, spx, spy, tileWidth, tileHeight, 0, 0, tileWidth, tileHeight ],
				width: tileWidth,
				height: tileHeight,
				tags: [
					[ "s", [ sx, sy ] ],
					[ "ts", [ col, row ] ],
				],
			});

			ctx.drawImage(tile.canvas, col * tileWidth, row * tileHeight);

			tileset.setTile(`${ col },${ row }`, tile);
		}
	}

	return tileset;
};

export default {
	byGrid,
};