import { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../App.jsx";

import { TileSetPreview } from "./../components/tessellator/TileSetPreview.jsx";
import { Canvas } from "../components/tessellator/Canvas.jsx";

export function Mixer() {
	const [ state, dispatch ] = useContext(Context);

	if(!state || !state.tileset || !state.tileset.tiles || state.tileset.tiles.length === 0) {
		return (
			<Link
				to="/tessellator"
				className={ `px-4 py-2 mt-4 text-center text-gray-700 border border-solid rounded bg-neutral-50 hover:bg-neutral-100 border-neutral-300 hover:border-neutral-400` }
			>
				Back to Tessellator
			</Link>
		);
	}

	//TODO: The order of the tiles is not preserved below -- force retessellations on changes, and create `sX,Y` (source) and `tsX,Y` (tileset) tags for each tile

	const tileEntries = state.tileset.tiles.map(t => [ t.tags.get("ts"), t ]);	//? i=0 won't be the right index anymore
	const map = {};
	let w = 0,
		h = 0;
	for(let [ key, value ] of tileEntries) {
		// const [ x, y ] = key.slice(2).split(",").map(Number);
		const [ x, y ] = key.map(Number);

		if(!map[ y ]) {
			map[ y ] = {};
		}

		map[ y ][ x ] = value;

		w = Math.max(w, x);
		h = Math.max(h, y);
	}

	const rows = [];
	for(let y = 0; y <= h; y++) {
		const row = [];

		for(let x = 0; x <= w; x++) {
			row.push(map[ y ][ x ]);
		}

		rows.push(row);
	}

	console.log(rows)

	return (
		<>
			<div className="m-auto">
				<TileSetPreview isRowXCol={ state.isRowXCol } tiles={ state.tileset.tiles } size={ state.size } />
			</div>

			<hr />

			<div className="m-auto">
				{
					rows.map((row, y) => (
						<div className="flex flex-row gap-1" key={ y }>
							{
								row.map((tile, x) => (
									<div className="flex flex-col gap-2" key={ x }>
										<Canvas
											canvas={ tile.canvas }
											className={ `p-1 border border-solid rounded border-neutral-200 h-[64px]` }
										/>
									</div>
								))
							}
						</div>
					))
				}
			</div>
		</>
	)
}

export default Mixer;