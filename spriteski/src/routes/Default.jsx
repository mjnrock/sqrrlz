import { useState, useRef, useEffect } from "react";

import { InputText } from "../components/InputField.jsx";

import { Tile } from "./../lib/tiles/Tile.js";
import { TileSet } from "./../lib/tiles/TileSet.js";

export function CanvasComponent({ canvas, ...props }) {
	const canvasRef = useRef(null);

	useEffect(() => {
		const ctx = canvasRef.current.getContext("2d");

		canvasRef.current.width = canvas.width;
		canvasRef.current.height = canvas.height;
		ctx.drawImage(canvas, 0, 0);
	}, [ canvas ]);

	return (
		<canvas
			ref={ canvasRef }
			className={ `p-2 border border-gray-200 hover:border-gray-300 border-solid rounded shadow-lg cursor-pointer` }
			{ ...props }
		/>
	);
}

export function Default() {
	const [ image, setImage ] = useState(null);
	const [ tileWidth, setTileWidth ] = useState(32);
	const [ tileHeight, setTileHeight ] = useState(32);
	const [ resultMagnitude, setResultMagnitude ] = useState(1);
	const [ isRowXCol, setIsRowXCol ] = useState(true);
	const [ tiles, setTiles ] = useState([]);
	const canvasRef = useRef(null);

	const handleFileInputChange = (event) => {
		const files = event.target.files;
		if(files.length > 0) {
			const file = files[ 0 ];
			const reader = new FileReader();
			reader.onload = (event) => {
				const image = new Image();
				image.onload = () => {
					setImage(image);
				};
				image.src = event.target.result;
			};
			reader.readAsDataURL(file);
		}
	};
	const handleButtonClick = () => {
		document.getElementById("fileInput").click();
	};
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
	const renderTiles = () => {
		let result;

		if(isRowXCol) {
			result = tiles
				// LTR-TTB
				.reduce((rows, tile, index) => {
					const rowIndex = Math.floor(index / resultMagnitude);
					const columnIndex = index % resultMagnitude;

					if(!rows[ rowIndex ]) {
						rows[ rowIndex ] = [];
					}

					rows[ rowIndex ][ columnIndex ] = (
						<CanvasComponent key={ tile.id } canvas={ tile.canvas } />
					);

					return rows;
				}, []);
		} else {
			result = tiles
				// TTB-LTR
				.reduce((rows, tile, index) => {
					const rowIndex = index % resultMagnitude;
					const columnIndex = Math.floor(index / resultMagnitude);

					if(!rows[ rowIndex ]) {
						rows[ rowIndex ] = [];
					}

					rows[ rowIndex ][ columnIndex ] = (
						<CanvasComponent key={ tile.id } canvas={ tile.canvas } />
					);

					return rows;
				}, []);
		}


		return result.map((row, index) => (
			<div key={ index } className={ `flex  gap-2` }>
				{ row }
			</div>
		));
	};
	const tessellate = async e => {
		const tileset = await TileSet.Factory({ source: canvasRef.current });

		if(isRowXCol) {
			// LTR-TTB
			for(let row = 0; row < tileset.height; row += tileHeight) {
				for(let col = 0; col < tileset.width; col += tileWidth) {
					const tile = new Tile({ width: tileWidth, height: tileHeight });

					await tile.paint(tileset.canvas, col, row, tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);

					tileset.addTile(tile);
				}
			}
		} else {
			// TTB-LTR
			for(let col = 0; col < tileset.width; col += tileWidth) {
				for(let row = 0; row < tileset.height; row += tileHeight) {
					const tile = new Tile({ width: tileWidth, height: tileHeight });

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
				<input
					type="file"
					id="fileInput"
					accept=".jpg,.jpeg,.gif,.png"
					className="hidden"
					onChange={ handleFileInputChange }
				/>
				<button
					className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
					onClick={ handleButtonClick }
					style={ { fontFamily: "'Fredoka One', cursive" } } // Add font family
				>
					Choose File
				</button>
			</div>

			<div className="m-auto">
				<canvas
					ref={ canvasRef }
					className={ `p-4 border border-gray-200 hover:border-gray-300 border-solid rounded shadow-lg cursor-pointer` + (image ? "" : " hidden") }
				/>
			</div>

			<hr />

			<div className="m-auto">
				<div className={ `flex flex-col w-full gap-2` }>
					{
						renderTiles()
					}
				</div>
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

export default Default;