import { Canvas } from "./Canvas.jsx";


export function TileSetPreview({ tiles, isRowXCol, size }) {
	function handleCanvasClick(e, tile) {
		if(e.ctrlKey) {
			const canvasData = tile.canvas.toDataURL();

			navigator.clipboard.writeText(canvasData);

			console.info("Canvas data copied to clipboard: ", canvasData);
		}
	}

	const result = tiles
		.reduce((rows, tile, index) => {
			let rowIndex;
			let columnIndex;
			if(isRowXCol) {
				// LTR-TTB
				rowIndex = Math.floor(index / size);
				columnIndex = index % size;
			} else {
				// TTB-LTR
				rowIndex = index % size;
				columnIndex = Math.floor(index / size);
			}

			if(!rows[ rowIndex ]) {
				rows[ rowIndex ] = [];
			}

			rows[ rowIndex ][ columnIndex ] = (
				<Canvas
					key={ tile.id }
					className={ `p-2 border border-gray-200 hover:border-gray-400 active:bg-gray-100 border-solid rounded shadow-md hover:shadow-lg cursor-pointer` }
					canvas={ tile.canvas }
					onClick={ e => handleCanvasClick(e, tile) }
					data-tags={ tile.getTags() }
				/>
			);

			return rows;
		}, []);

	return (
		<div className={ `flex flex-col w-full gap-2` }>
			{
				result.map((row, index) => (
					<div key={ index } className={ `flex  gap-2` }>
						{ row }
					</div>
				))
			}
		</div>
	);
};

export default TileSetPreview;