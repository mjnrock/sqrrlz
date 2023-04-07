import { useState, useRef, useEffect } from "react";
import { Base64 } from "./../modules/tiles/Base64.js";

import { InputText } from "../components/InputField.jsx";

import { Tile } from "./../modules/tiles/Tile.js";
import { TileSet } from "./../modules/tiles/TileSet.js";

export function CanvasComponent({ canvas }) {
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
		/>
	);
}

export function Default() {
	const [ image, setImage ] = useState(null);
	const [ tileWidth, setTileWidth ] = useState(32);
	const [ tileHeight, setTileHeight ] = useState(32);
	const [ resultColumns, setResultColumns ] = useState(1);
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
		let columns = 1;

		if(type === 0) {
			columns = Math.ceil(Math.sqrt(tiles.length));
		} else if(type === 1) {
			columns = Math.ceil(image.width / tileWidth);
		}

		setResultColumns(columns);
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		if(image) {
			canvas.width = image.width;
			canvas.height = image.height;
			context.drawImage(image, 0, 0);
		}
	}, [ image ]);

	return (
		<div className="flex flex-col h-screen gap-4 m-4">
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
				<div className="flex flex-col w-full gap-2">
					{
						tiles
							.reduce((rows, tile, index) => {
								const rowIndex = Math.floor(index / resultColumns);
								const columnIndex = index % resultColumns;

								if(!rows[ rowIndex ]) {
									rows[ rowIndex ] = [];
								}

								rows[ rowIndex ][ columnIndex ] = (
									<div key={ tile.id } className="flex-none">
										<CanvasComponent canvas={ tile.canvas } />
									</div>
								);

								return rows;
							}, [])
							.map((row, index) => (
								<div key={ index } className="flex gap-2">
									{ row }
								</div>
							))
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
								onClick={ async e => {
									const tileset = await TileSet.Factory({ source: canvasRef.current });

									for(let y = 0; y < tileset.height; y += tileHeight) {
										for(let x = 0; x < tileset.width; x += tileWidth) {
											const tile = new Tile({ width: tileWidth, height: tileHeight });

											await tile.paint(tileset.canvas, x, y, tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);

											tileset.addTile(tile);
										}
									}

									canvasRef.current = tileset.canvas;

									setTiles(tileset.tiles);

									calculateRowsAndColumns(1);
								} }
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
									label="Display Columns"
									placeholder="1, 2, 3, ..."
									value={ resultColumns }
									onChange={ e => setResultColumns(~~e.target.value) }
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
							</div>
						</div>
					) : null
				}
			</div>
		</div>
	);
}

export default Default;
