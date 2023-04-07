export function FileUpload({ onImage }) {
	const handleFileInputChange = (event) => {
		const files = event.target.files;
		if(files.length > 0) {
			const file = files[ 0 ];
			const reader = new FileReader();
			reader.onload = (event) => {
				const image = new Image();
				image.onload = () => {
					onImage(image);
				};
				image.src = event.target.result;
			};
			reader.readAsDataURL(file);
		}
	};
	const handleButtonClick = () => {
		document.getElementById("fileInput").click();
	};

	return (
		<>
			<input
				type="file"
				id="fileInput"
				accept=".jpg,.jpeg,.gif,.png"
				className="hidden"
				onChange={ handleFileInputChange }
			/>
			<button
				className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
				onClick={ handleButtonClick }
				style={ { fontFamily: "'Fredoka One', cursive" } } // Add font family
			>
				Choose File
			</button>
		</>
	);
};

export default FileUpload;