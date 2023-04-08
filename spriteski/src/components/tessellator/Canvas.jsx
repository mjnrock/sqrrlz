import { useEffect, useRef } from "react";


export function RefCanvas({ canvas, ...props }) {
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
			{ ...props }
		/>
	);
};

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
			{ ...props }
		/>
	);
};

export default RefCanvas;