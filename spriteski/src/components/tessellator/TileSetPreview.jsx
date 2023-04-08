import { RefCanvas } from "./Canvas.jsx";

function handleCanvasClick(e, tile) {
	if(e.ctrlKey) {
		const canvasData = tile.canvas.toDataURL();

		navigator.clipboard.writeText(canvasData);

		console.info("Canvas data copied to clipboard: ", canvasData);
	}
};

export function TileSetPreview({ tileset, size = 1 }) {
	let cols = 0,
		rows = 0,
		tiles = {};
	for(let tile of tileset.tiles) {
		let [ x, y ] = tile.tags.get("ts");

		cols = Math.max(cols, x);
		rows = Math.max(rows, y);
		tiles[ tile.tags.get("ts").toString() ] = tile;
	}

	let result = [];
	for(let row = 0; row <= rows; row++) {
		let line = [];
		for(let col = 0; col <= cols; col++) {
			let tile = tiles[ [ col, row ].toString() ];

			line.push((
				<RefCanvas
					key={ tile.id }
					className={ `p-2 border border-gray-200 hover:border-gray-400 active:bg-gray-100 border-solid rounded shadow-md hover:shadow-lg cursor-pointer` }
					canvas={ tile.canvas }
					onClick={ e => handleCanvasClick(e, tile) }
				/>
			));
		}

		result.push(line);
	}

	return (
		<div className={ `flex flex-col w-full gap-2` }>
			{
				result.map((row, index) => (
					<div key={ index } className={ `flex gap-2` }>
						{ row }
					</div>
				))
			}
		</div>
	);
};

export default TileSetPreview;