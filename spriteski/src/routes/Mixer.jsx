import { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../App.jsx";

import { TileSetPreview } from "./../components/tessellator/TileSetPreview.jsx";

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

	return (

		<div className="m-auto">
			<TileSetPreview isRowXCol={ state.isRowXCol } tiles={ state.tileset.tiles } size={ state.size } />
		</div>
	)
}

export default Mixer;