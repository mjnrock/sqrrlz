import { useState, useRef, useEffect, useContext } from "react";

import { byGrid } from "./../modules/tiles/tessellators/Grid.js";

import { InputText } from "../components/InputField.jsx";
import { FileUpload } from "../components/tessellator/FileUpload.jsx";
import { CanvasPreview } from "../components/tessellator/ImagePreview.jsx";
import { TileSetPreview } from "../components/tessellator/TileSetPreview.jsx";

import { Context, EnumAction } from "../App.jsx";
import { Link } from "react-router-dom";

export function Tessellator() {
	const [ state, dispatch ] = useContext(Context);
	const [ image, setImage ] = useState(state && state.image ? state.image : null);
	const [ tileWidth, setTileWidth ] = useState(32);
	const [ tileHeight, setTileHeight ] = useState(32);
	const [ resultMagnitude, setResultMagnitude ] = useState(state && state.size ? state.size : 1);
	const [ isRowXCol, setIsRowXCol ] = useState(state && state.isRowXCol !== void 0 ? state.isRowXCol : true);
	const [ tileset, setTileset ] = useState(state && state.tileset ? state.tileset : null);
	const canvasRef = useRef(null);

	const dispatchTileset = ({ ...args } = {}) => {
		dispatch({
			type: EnumAction.SET_TILESET,
			payload: {
				image,
				tileset,
				size: resultMagnitude,
				isRowXCol,
				...args,
			},
		});
	};

	const calculateRowsAndColumns = (type = 0) => {
		let threshold = 1;
		if(type === 0) {
			threshold = Math.ceil(Math.sqrt(tileset.tileslength));
		} else if(type === 1) {
			threshold = Math.ceil(image.width / tileWidth);
		} else if(type === 2) {
			threshold = Math.ceil(image.height / tileHeight);
		}

		setResultMagnitude(threshold);
	};
	const tessellate = async e => {
		const ts = await byGrid({
			source: canvasRef.current,
			isRowXCol,
			tileWidth,
			tileHeight,
		});

		canvasRef.current = ts.canvas;

		setTileset(ts);

		calculateRowsAndColumns(isRowXCol ? 1 : 2);

		dispatchTileset({ tileset: ts });
	};

	useEffect(() => {
		if(image) {
			const ctx = canvasRef.current.getContext("2d");
			canvasRef.current.width = image.width;
			canvasRef.current.height = image.height;
			ctx.drawImage(image, 0, 0);
		}
	}, [ image ]);

	useEffect(() => {
		if(image) {
			dispatchTileset();
		}
	}, [ isRowXCol ]);

	useEffect(() => {
		if(image) {
			dispatchTileset();
		}
	}, [ resultMagnitude ]);

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

				{
					image ? (
						<>
							{/* TODO: Eventually this should be a dropdown that selects the algorithm */ }
							<div className="w-full mt-4 text-lg italic font-bold text-center">byGrid</div>
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
						</>
					) : null
				}
			</div>

			<hr />

			<div className="m-auto">
				{
					tileset && tileset.tiles && tileset.tiles.length ? (
						<div className="flex flex-col items-center w-full">
							<div className="flex flex-row gap-2">
								<InputText
									type="number"
									label={ `Display Size` }
									placeholder="1, 2, 3, ..."
									value={ resultMagnitude }
									onChange={ e => {
										setResultMagnitude(~~e.target.value);

										dispatch({
											type: EnumAction.SET_TILESET_SIZE,
											payload: ~~e.target.value,
										});
									} }
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
										let next = !isRowXCol;
										setIsRowXCol(next);

										dispatch({
											type: EnumAction.SET_TILESET_DIRECTION,
											payload: next,
										});
									} }
									style={ { fontFamily: "'Fredoka One', cursive" } }
								>
									Swap to { isRowXCol ? "TTB-LTR" : "LTR-TTB" }
								</button>
							</div>

							<Link
								to="/mixer"
								className={ `px-4 py-2 mt-4 text-center text-gray-700 border border-solid rounded bg-neutral-50 hover:bg-neutral-100 border-neutral-300 hover:border-neutral-400` }
							>
								Next
							</Link>
						</div>
					) : null
				}
			</div>

			{
				tileset && tileset.tiles && tileset.tiles.length ? (
					<div className="m-auto">
						<TileSetPreview isRowXCol={ isRowXCol } tiles={ tileset.tiles } size={ resultMagnitude } />
					</div>
				) : null
			}
		</div>
	);
}

export default Tessellator;