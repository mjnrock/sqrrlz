import { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "./../contexts/Tessellation.js";

import { TileSetPreview } from "./../components/tessellator/TileSetPreview.jsx";
import { Canvas } from "../components/tessellator/Canvas.jsx";
import { PixelScaleCanvas } from "../modules/tiles/Base64.js";

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
	const factor = 128;
	const rows = tileset.asArray();

	return (
		<div className="flex flex-col gap-4 mt-2">
			<div className="m-auto max-h-[136px]">
				<TileSetPreview tileset={ tileset } />
			</div>

			<hr />

			<div className="m-auto">
				<div className="flex flex-col gap-2">
					{
						rows.map((row, y) => (
							<>
								<div className="flex flex-row gap-1" key={ y }>
									{
										row.map((tile, x) => (
											<div className="flex flex-col gap-1" key={ x }>
												<Canvas
													canvas={ PixelScaleCanvas(tile.canvas, factor / tile.canvas.width) }
													className={ `p-1 border border-solid rounded border-neutral-200` }
												/>
											</div>
										))
									}
								</div>
							</>
						))
					}
				</div>
			</div>
		</div>
	)
}

export default Mixer;