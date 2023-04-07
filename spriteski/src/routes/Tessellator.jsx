import { useState, useRef, useEffect } from "react";

import { InputText } from "../components/InputField.jsx";

import { Tile } from "../modules/tiles/Tile.js";
import { TileSet } from "../modules/tiles/TileSet.js";
import FileUpload from "../components/tessellator/FileUpload.jsx";
import CanvasPreview from "../components/tessellator/ImagePreview.jsx";
import TileSetPreview from "../components/tessellator/TileSetPreview.jsx";

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
		const tileset = await TileSet.Factory({ source: canvasRef.current });

		if(isRowXCol) {
			// LTR-TTB
			for(let row = 0; row < tileset.height; row += tileHeight) {
				for(let col = 0; col < tileset.width; col += tileWidth) {
					let [ x, y ] = [ col / tileWidth, row / tileHeight ];
					const tile = new Tile({ width: tileWidth, height: tileHeight, tags: [ `${ x },${ y }` ] });

					await tile.paint(tileset.canvas, col, row, tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);

					tileset.addTile(tile);
				}
			}
		} else {
			// TTB-LTR
			for(let col = 0; col < tileset.width; col += tileWidth) {
				for(let row = 0; row < tileset.height; row += tileHeight) {
					let [ x, y ] = [ col / tileWidth, row / tileHeight ];
					const tile = new Tile({ width: tileWidth, height: tileHeight, tags: [ `${ x },${ y }` ] });

					await tile.paint(tileset.canvas, col, row, tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);

					tileset.addTile(tile);
				}
			}
		}

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
			<div className="m-auto">
				<FileUpload onImage={ img => setImage(img) } />
			</div>

			<div className="m-auto">
				<CanvasPreview canvasRef={ canvasRef } hide={ !image } />
			</div>

			<hr />

			<div className="m-auto">
				<TileSetPreview isRowXCol={ isRowXCol } tiles={ tiles } size={ resultMagnitude } />
			</div>

			<div className="m-auto">
				{
					image ? (
						<div className="flex flex-row w-full gap-4">
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

							<button
								className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
								onClick={ tessellate }
								style={ {
									fontFamily: "'Fredoka One', cursive"
								} }
							>
								Tessellate
							</button>
						</div>
					) : null
				}

				{
					tiles.length ? (
						<div className="flex flex-col w-full gap-4">

							<div className="flex flex-row w-full gap-4">
								<InputText
									type="number"
									label={ `Display Size` }
									placeholder="1, 2, 3, ..."
									value={ resultMagnitude }
									onChange={ e => setResultMagnitude(~~e.target.value) }
								/>

								<button
									className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
									onClick={ e => calculateRowsAndColumns(0) }
								>
									Evenly Distribute
								</button>

								<button
									className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
									onClick={ e => calculateRowsAndColumns(1) }
								>
									Source Ratio
								</button>

								<button
									className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
									onClick={ e => {

										setIsRowXCol(!isRowXCol);
									} }
								>
									Swap to { isRowXCol ? "TTB-LTR" : "LTR-TTB" }
								</button>
							</div>
						</div>
					) : null
				}
			</div>
		</div>
	);
}

export default Tessellator;