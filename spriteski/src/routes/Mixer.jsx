import { useReducer, useContext, useEffect } from "react";

import { Track } from "./../lib/mixer/Track.js";
import { Frame } from "./../lib/mixer/Frame.js";

import { TileSetPreview } from "./../components/tessellator/TileSetPreview.jsx";
import { Track as TrackJSX } from "../components/mixer/Track.jsx";

import { Context as TessellationContext } from "./../contexts/Tessellation.js";
import { Context as MixerContext, State as MixerState, EnumAction as MixerEnumAction, reducer as mixerReducer } from "./../contexts/Mixer.js";

export function Mixer() {
	const [ mixerState, mixerDispatch ] = useContext(MixerContext);
	const [ tessellationState, tessellationDispatch ] = useContext(TessellationContext);

	const { tileset } = tessellationState;
	const { mixer } = mixerState;
	// const tracks = tileset.asArray().map(row => new Track({ frames: row.map(tile => new Frame({ tile, duration: 125 })) }));

	useEffect(() => {
		mixerDispatch({
			type: "SET_TRACKS",
			payload: {
				tracks: tileset.asArray().map(row => new Track({ frames: row.map(tile => new Frame({ tile, duration: 125 })) })),
			},
		});
	}, [ tileset ]);

	return (
			<div className="flex flex-col items-center justify-center select-none">
				<div className="flex w-full max-h-[136px] overflow-y-scroll border-b border-solid border-neutral-200 p-2 pb-8 shadow-sm bg-neutral-50">
					<TileSetPreview tileset={ tileset } />
				</div>


				<hr />

				<div className="py-2 m-auto">
					<div className="flex flex-col gap-4">
						{
							Array.from(mixer.tracks.values()).map((track, y) => {
								return (
									<div className="flex flex-row">
										<input
											className="py-1 pl-4 mx-2 text-sm font-bold text-center border border-solid rounded shadow text-neutral-50 bg-neutral-600 border-neutral-300"
											type="number"
											value={ y }
											onChange={ e => mixerDispatch({
												type: MixerEnumAction.SWAP_TRACK_INDEX,
												payload: {
													i1: y,
													i2: ~~e.target.value,
												},
											}) }
										/>

										<TrackJSX key={ track.id } track={ track } factor={ 128 } />
									</div>
								);
							})
						}
					</div>
				</div>
			</div>
	)
};

export default Mixer;