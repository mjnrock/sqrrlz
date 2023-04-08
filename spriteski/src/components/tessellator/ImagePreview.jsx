import { useEffect } from "react";

export function ImagePreview({ canvasRef, watch, hide = true }) {
	useEffect(() => {
		if(watch) {
			const ctx = canvasRef.current.getContext("2d");
			canvasRef.current.width = watch.width;
			canvasRef.current.height = watch.height;
			ctx.drawImage(watch, 0, 0);
		}
	}, [ watch ]);

	return (
		<canvas
			ref={ canvasRef }
			className={ `p-4 border border-gray-200 hover:border-gray-300 border-solid rounded shadow-lg cursor-pointer m-auto ` + (hide ? "hidden" : "") }
		/>
	);
};

export default ImagePreview;