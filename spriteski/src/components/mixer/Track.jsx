import { useState } from "react";

import { Canvas } from "./../tessellator/Canvas.jsx";
import { PixelScaleCanvas } from "./../../modules/tiles/Base64.js";

export function Track({ tiles, factor = 128, onTimeChange, ...props }) {
	const [ timing, setTiming ] = useState(new Map(tiles.map(tile => [ tile.id, 125 ])));

	function setTime(id, time) {
		setTiming(new Map(timing.set(id, time)));

		if(onTimeChange) {
			onTimeChange(id, time);
		}
	}

	return (
		<div className="flex flex-row gap-1 p-2 py-5 border border-solid rounded shadow-lg border-neutral-300 bg-neutral-100" { ...props }>
			{
				tiles.map((tile, x) => (
					<div className="flex flex-col gap-1 rounded max-w-[128px]" key={ x }>
						<div
							className="mx-3 text-xs text-center rounded text-blue-400 shadow border border-solid border-blue-200 bg-blue-100 p-[1px] hover:bg-blue-200 hover:border-blue-300 active:bg-blue-300 active:border-blue-400 active:text-blue-500 cursor-copy"
							onClick={ () => navigator.clipboard.writeText(tile.id) }
						>
							{ tile.id.substring(0, 8) }
						</div>

						<Canvas
							canvas={ PixelScaleCanvas(tile.canvas, factor / tile.canvas.width) }
							className={ `m-1 border border-solid rounded border-neutral-200 shadow` }
						/>

						<input
							className="py-1 pl-4 mx-2 text-sm font-bold text-center border border-solid rounded shadow text-neutral-50 bg-neutral-600 border-neutral-300"
							type="number"
							value={ timing.get(tile.id) }
							onChange={ e => setTime(tile.id, ~~e.target.value) }
						/>

						<div className="flex flex-row justify-between w-full gap-[1px] px-1 mt-1 rounded">
							{
								[ 8, 5, 4, 3, 2, 1 ].map((time, i) => (
									<button
										className={ `flex-1 py-1 text-xs text-center text-indigo-500 bg-indigo-100 border border-indigo-300 border-solid rounded hover:bg-indigo-300 active:bg-indigo-400` }
										onClick={ () => setTime(tile.id, ~~(1000 / time)) }
										key={ i }
									>
										{ time }
									</button>
								))
							}
						</div>
					</div>
				))
			}
		</div>
	)
};

export default Track;