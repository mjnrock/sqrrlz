import { useRef, useContext } from "react";

import { byGrid } from "./../modules/tiles/tessellators/Grid.js";

import { InputText } from "../components/InputField.jsx";
import { FileUpload } from "../components/tessellator/FileUpload.jsx";
import { ImagePreview } from "../components/tessellator/ImagePreview.jsx";
import { TileSetPreview } from "../components/tessellator/TileSetPreview.jsx";
import { Canvas } from "../components/tessellator/Canvas.jsx";

import { Context, EnumAction } from "../App.jsx";
import { Link } from "react-router-dom";

export function Tessellator() {
	const [ state, dispatch ] = useContext(Context);
	const canvasRef = useRef(null);
	const { image, size, isRowXCol, tileset, tileWidth, tileHeight } = state;

	const dispatchTileset = ({ ...args } = {}) => {
		dispatch({
			type: EnumAction.SET_TILESET,
			payload: {
				image,
				tileset,
				size,
				isRowXCol,
				tileWidth,
				tileHeight,
				...args,
			},
		});
	};

	const calcSize = (input, { ...args } = {}) => {
		if(!image || !tileset) {
			return 1;
		}

		if(input === "even") {
			return Math.ceil(Math.sqrt(tileset.tiles.length));
		} else if(input === "source") {
			if("isRowXCol" in args ? args.isRowXCol : isRowXCol) {
				return Math.ceil(image.width / tileWidth);
			} else {
				return Math.ceil(image.height / tileHeight);
			}
		}

		return size;
	};
	const tessellate = async ({ ...args } = {}) => {
		const ts = await byGrid({
			source: image,
			isRowXCol: "isRowXCol" in args ? args.isRowXCol : isRowXCol,
			tileWidth,
			tileHeight,
		});

		canvasRef.current = ts.canvas;

		dispatchTileset({ tileset: ts, size: calcSize("source", args), ...args });
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="flex flex-col gap-4">
				{
					!image ? (
						<div className="m-auto">
							<FileUpload onImage={ img => dispatchTileset({ image: img }) } />
						</div>
					) : null
				}

				<div className="m-auto">
					<ImagePreview canvasRef={ canvasRef } watch={ image } hide={ !image } />

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
											onChange={ e => tessellate({ tileWidth: ~~e.target.value }) }
										/>

										<InputText
											type="number"
											label="Tile Height"
											placeholder="16, 32, 64, ..."
											value={ tileHeight }
											onChange={ e => tessellate({ tileHeight: ~~e.target.value }) }
										/>
									</div>

									<div className="flex flex-row gap-2">

										<button
											className="px-4 py-2 mt-4 font-bold text-gray-700 border border-solid rounded bg-neutral-50 hover:bg-neutral-100 border-neutral-300 hover:border-neutral-400"
											onClick={ e => tessellate({ isRowXCol: true }) }
											style={ { fontFamily: "'Fredoka One', cursive" } }
										>
											LTR-TTB
										</button>
										<button
											className="px-4 py-2 mt-4 font-bold text-gray-700 border border-solid rounded bg-neutral-50 hover:bg-neutral-100 border-neutral-300 hover:border-neutral-400"
											onClick={ e => tessellate({ isRowXCol: false }) }
											style={ { fontFamily: "'Fredoka One', cursive" } }
										>
											TTB-LTR
										</button>
									</div>
								</div>
							</>
						) : null
					}
				</div>

				<div className="m-auto">
					{
						tileset && tileset.tiles && tileset.tiles.length ? (
							<>
								<hr className="mt-4" />

								<div className="flex flex-col items-center w-full gap-2 font-bold">
									<Link
										to="/mixer"
										className={ `px-4 py-2 mt-4 text-center text-gray-700 border border-solid rounded bg-neutral-50 hover:bg-neutral-100 border-neutral-300 hover:border-neutral-400` }
									>
										Next
									</Link>

									<div className="m-auto">
										<TileSetPreview tileset={ tileset } size={ size } />
									</div>
								</div>
							</>
						) : null
					}
				</div>
			</div>
		</div>
	);
}

export default Tessellator;