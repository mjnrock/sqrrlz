import { useState, useRef, useEffect } from 'react';

function Default() {
	const [ image, setImage ] = useState(null);
	const canvasRef = useRef(null);

	const handleFileInputChange = (event) => {
		const files = event.target.files;
		if(files.length > 0) {
			const file = files[ 0 ];
			const reader = new FileReader();
			reader.onload = (event) => {
				const image = new Image();
				image.onload = () => {
					setImage(image);
				};
				image.src = event.target.result;
			};
			reader.readAsDataURL(file);
		}
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		if(image) {
			canvas.width = image.width;
			canvas.height = image.height;
			context.drawImage(image, 0, 0);
		}
	}, [ image ]);

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="relative overflow-hidden border-2 border-gray-400 rounded-lg shadow-lg">
				<input
					type="file"
					onChange={ handleFileInputChange }
					className="absolute inset-0 z-10 opacity-0"
				/>
				<canvas ref={ canvasRef }></canvas>
			</div>
		</div>
	);
}

export default Default;
