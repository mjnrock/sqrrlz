import { useState, useRef, useEffect } from "react";

import { byGrid } from "./../modules/tiles/tessellators/Grid.js";

import { InputText } from "../components/InputField.jsx";
import { FileUpload } from "../components/tessellator/FileUpload.jsx";
import { CanvasPreview } from "../components/tessellator/ImagePreview.jsx";
import { TileSetPreview } from "../components/tessellator/TileSetPreview.jsx";

export function Tessellator() {
	const [ image, setImage ] = useState(null);
	const [ tileWidth, setTileWidth ] = useState(32);
	const [ tileHeight, setTileHeight ] = useState(32);
	const [ resultMagnitude, setResultMagnitude ] = useState(1);
	const [ isRowXCol, setIsRowXCol ] = useState(true);
	const [ tiles, setTiles ] = useState([]);
	const canvasRef = useRef(null);

	const calculateRowsAndColumns = (type = 0) => {
		let threshold = 1;
		if(type === 0) {
			threshold = Math.ceil(Math.sqrt(tiles.length));
		} else if(type === 1) {
			threshold = Math.ceil(image.width / tileWidth);
		} else if(type === 2) {
			threshold = Math.ceil(image.height / tileHeight);
		}

		setResultMagnitude(threshold);
	};
	const tessellate = async e => {
		const tileset = await byGrid({
			source: canvasRef.current,
			isRowXCol,
			tileWidth,
			tileHeight,
		});

		canvasRef.current = tileset.canvas;

		setTiles(tileset.tiles);

		calculateRowsAndColumns(isRowXCol ? 1 : 2);
	};

	useEffect(() => {
		if(image) {
			const context = canvasRef.current.getContext("2d");
			canvasRef.current.width = image.width;
			canvasRef.current.height = image.height;
			context.drawImage(image, 0, 0);
		}
	}, [ image ]);

	useEffect(() => {
		if(image) {
			setTiles([ ...tiles ]);
		}
	}, [ isRowXCol ]);

	return (
		<div className="flex flex-col h-screen gap-4 m-8">
			{
				!image ? (
					<div className="m-auto">
						<FileUpload onImage={ img => setImage(img) } />
					</div>
				) : null
			}

			<div className="m-auto">
				<CanvasPreview canvasRef={ canvasRef } hide={ !image } />

				{/* TODO: Eventually this should be a dropdown that selects the algorithm */}
				<div className="w-full mt-4 text-lg italic font-bold text-center">byGrid</div>

				{
					image ? (
						<div className="flex flex-col items-center w-full">
							<div className="flex flex-row gap-2">
								<InputText
									type="number"
									label="Tile Width"
									placeholder="16, 32, 64, ..."
									value={ tileWidth }
									onChange={ e => setTileWidth(~~e.target.value) }
								/>

								<InputText
									type="number"
									label="Tile Height"
									placeholder="16, 32, 64, ..."
									value={ tileHeight }
									onChange={ e => setTileHeight(~~e.target.value) }
								/>
							</div>

							<div className="flex flex-row">
								<button
									className="px-4 py-2 mt-4 font-mono text-gray-700 border border-solid rounded bg-neutral-50 hover:bg-neutral-100 border-neutral-300 hover:border-neutral-400"
									onClick={ tessellate }
									style={ {
										fontFamily: "'Fredoka One', cursive"
									} }
								>
									Tessellate
								</button>
							</div>
						</div>
					) : null
				}
			</div>

			<hr />

			<div className="m-auto">
				{
					tiles.length ? (
						<div className="flex flex-col items-center w-full">
							<div className="flex flex-row gap-2">
								<InputText
									type="number"
									label={ `Display Size` }
									placeholder="1, 2, 3, ..."
									value={ resultMagnitude }
									onChange={ e => setResultMagnitude(~~e.target.value) }
								/>
							</div>

							<div className="flex flex-row gap-2">
								<button
									className="px-4 py-2 mt-4 text-gray-700 border border-solid rounded bg-neutral-50 hover:bg-neutral-100 border-neutral-300 hover:border-neutral-400"
									onClick={ e => calculateRowsAndColumns(0) }
									style={ { fontFamily: "'Fredoka One', cursive" } }
								>
									Evenly Distribute
								</button>

								<button
									className="px-4 py-2 mt-4 text-gray-700 border border-solid rounded bg-neutral-50 hover:bg-neutral-100 border-neutral-300 hover:border-neutral-400"
									onClick={ e => calculateRowsAndColumns(1) }
									style={ { fontFamily: "'Fredoka One', cursive" } }
								>
									Source Ratio
								</button>

								<button
									className="px-4 py-2 mt-4 text-gray-700 border border-solid rounded bg-neutral-50 hover:bg-neutral-100 border-neutral-300 hover:border-neutral-400"
									onClick={ e => {
										setIsRowXCol(!isRowXCol);
									} }
									style={ { fontFamily: "'Fredoka One', cursive" } }
								>
									Swap to { isRowXCol ? "TTB-LTR" : "LTR-TTB" }
								</button>
							</div>
						</div>
					) : null
				}
			</div>

			<div className="m-auto">
				<TileSetPreview isRowXCol={ isRowXCol } tiles={ tiles } size={ resultMagnitude } />
			</div>
		</div>
	);
}

export default Tessellator;