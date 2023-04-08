import { useContext } from "react";
import { Link } from "react-router-dom";

import { Context, EnumAction } from "./../contexts/Tessellation.js";

import { TileSetPreview } from "./../components/tessellator/TileSetPreview.jsx";
import { Canvas } from "../components/tessellator/Canvas.jsx";

export function Mixer() {
	const [ state, dispatch ] = useContext(Context);

	if(!state || !state.tileset || !state.tileset.tiles || state.tileset.tiles.length === 0) {
		return (
			<div className="m-auto">
				<Link
					to="/tessellator"
					className={ `px-4 py-2 m-4 text-center text-gray-700 border border-solid rounded bg-neutral-50 hover:bg-neutral-100 border-neutral-300 hover:border-neutral-400` }
				>
					Back to Tessellator
				</Link>
			</div>
		);
	}

	const { tileset } = state;
	const rows = tileset.asArray();

	return (
		<>
			<div className="m-auto">
				<TileSetPreview tileset={ tileset } />
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