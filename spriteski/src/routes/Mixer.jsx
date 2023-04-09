import { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "./../contexts/Tessellation.js";

import { TileSetPreview } from "./../components/tessellator/TileSetPreview.jsx";
import { Track } from "../components/mixer/Track.jsx";

export function Mixer() {
	const [ state, dispatch ] = useContext(Context);

	const { tileset } = state;
	const tracks = tileset.asArray();

	return (
		<div className="flex flex-col gap-4 mt-2 select-none">
			<div className="m-auto max-h-[136px] overflow-y-hidden">
				<TileSetPreview tileset={ tileset } />
			</div>

			<hr />

			<div className="m-auto">
				<div className="flex flex-col gap-4">
					{
						tracks.map((row, y) => (
							<Track key={ y } tiles={ row } factor={ 128 } />
						))
					}
				</div>
			</div>
		</div>
	)
};

export default Mixer;