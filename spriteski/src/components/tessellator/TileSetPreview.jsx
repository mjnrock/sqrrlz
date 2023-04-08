import { RefCanvas } from "./Canvas.jsx";

function handleCanvasClick(e, tile) {
	if(e.ctrlKey) {
		const canvasData = tile.canvas.toDataURL();

		navigator.clipboard.writeText(canvasData);

		console.info("Canvas data copied to clipboard: ", canvasData);
	}
};

export function TileSetPreview({ tileset }) {
	return (
		<div className={ `flex flex-col w-full gap-2` }>
			{
				tileset.asArray()
					.map((row, y) => {
						return (
							<div key={ y } className="flex flex-row gap-2">
								{
									row.map((tile, x) => {
										return (
											<RefCanvas
												key={ tile.id }
												className={ `p-2 border border-gray-200 hover:border-gray-400 active:bg-gray-100 border-solid rounded shadow-md hover:shadow-lg cursor-pointer` }
												canvas={ tile.canvas }
												onClick={ e => handleCanvasClick(e, tile) }
											/>
										);
									})
								}
							</div>
						);
					})
			}
		</div>
	);
};

export default TileSetPreview;