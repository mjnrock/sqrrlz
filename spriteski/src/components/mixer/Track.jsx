import { useContext, useState } from "react";

import { Canvas } from "./../tessellator/Canvas.jsx";
import { PixelScaleCanvas } from "./../../lib/Base64.js";

import { Context, EnumAction } from "./../../contexts/Mixer.js";

export function Track({ track, factor = 128, onTimeChange, ...props }) {
	const [ state, dispatch ] = useContext(Context);
	const [ timing, setTiming ] = useState(new Map(Array.from(track.frames.values()).map(frame => [ frame.id, frame.duration ])));

	function setTime(id, time) {
		setTiming(new Map(timing.set(id, time)));

		if(onTimeChange) {
			onTimeChange(id, time);
		}
	}

	return (
		<div className="flex flex-row gap-1 p-2 py-5 border border-solid rounded shadow-lg border-neutral-300 bg-neutral-100" { ...props }>
			{
				Array.from(track.frames.values()).map((frame, x) => {
					return (
						<div className="flex flex-col gap-1 rounded max-w-[128px]" key={ frame.id }>
							<div
								className="mx-3 text-xs text-center rounded text-blue-400 shadow border border-solid border-blue-200 bg-blue-100 p-[1px] hover:bg-blue-200 hover:border-blue-300 active:bg-blue-300 active:border-blue-400 active:text-blue-500 cursor-copy"
								onClick={ () => navigator.clipboard.writeText(frame.id) }
							>
								{ frame.id.substring(0, 8) }
							</div>

							<input
								className="py-1 pl-4 mx-2 text-sm font-bold text-center border border-solid rounded shadow text-neutral-50 bg-neutral-600 border-neutral-300"
								type="number"
								value={ x }
								onChange={ e => dispatch({
									type: EnumAction.SWAP_FRAME_INDEX,
									payload: {
										tid: track.id,
										i1: x,
										i2: ~~e.target.value,
									},
								}) }
							/>

							<Canvas
								canvas={ PixelScaleCanvas(frame.tile.canvas, factor / frame.tile.canvas.width) }
								className={ `m-1 border border-solid rounded border-neutral-200 shadow` }
							/>

							<input
								className="py-1 pl-4 mx-2 text-sm font-bold text-center border border-solid rounded shadow text-neutral-50 bg-neutral-600 border-neutral-300"
								type="number"
								value={ timing.get(frame.id) }
								onChange={ e => setTime(frame.id, ~~e.target.value) }
							/>

							<div className="flex flex-row justify-between w-full gap-[1px] px-1 mt-1 rounded">
								{
									[ 8, 5, 4, 3, 2, 1 ].map((time, i) => (
										<button
											className={ `flex-1 py-1 text-xs text-center text-indigo-500 bg-indigo-100 border border-indigo-300 border-solid rounded hover:bg-indigo-300 active:bg-indigo-400` }
											onClick={ () => setTime(frame.id, ~~(1000 / time)) }
											key={ i }
										>
											{ time }
										</button>
									))
								}
							</div>
						</div>
					);
				})
			}
		</div>
	)
};

export default Track;