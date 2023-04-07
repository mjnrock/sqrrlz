export function CanvasPreview({ canvasRef, hide = true }) {
	return (
		<canvas
			ref={ canvasRef }
			className={ `p-4 border border-gray-200 hover:border-gray-300 border-solid rounded shadow-lg cursor-pointer m-auto ` + (hide ? "hidden" : "") }
		/>
	);
};

export default CanvasPreview;