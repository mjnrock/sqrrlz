import { useState, useEffect, useRef } from "react";

import { Canvas } from "./Canvas.jsx";

export function TileSetPreview({ tiles, isRowXCol, size, ...props }) {
	let result;

	if(isRowXCol) {
		result = tiles
			// LTR-TTB
			.reduce((rows, tile, index) => {
				const rowIndex = Math.floor(index / size);
				const columnIndex = index % size;

				if(!rows[ rowIndex ]) {
					rows[ rowIndex ] = [];
				}

				rows[ rowIndex ][ columnIndex ] = (
					<Canvas key={ tile.id } canvas={ tile.canvas } />
				);

				return rows;
			}, []);
	} else {
		result = tiles
			// TTB-LTR
			.reduce((rows, tile, index) => {
				const rowIndex = index % size;
				const columnIndex = Math.floor(index / size);

				if(!rows[ rowIndex ]) {
					rows[ rowIndex ] = [];
				}

				rows[ rowIndex ][ columnIndex ] = (
					<Canvas key={ tile.id } canvas={ tile.canvas } />
				);

				return rows;
			}, []);
	}

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