import { useEffect, useRef } from "react";


export function Canvas({ canvas, ...props }) {
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
};

export default Canvas;