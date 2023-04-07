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

	return (
		<div className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md border-neutral-300 bg-neutral-50 hover:bg-neutral-100 hover:border-neutral-400">
			<input
				type="file"
				id="fileInput"
				accept=".jpg,.jpeg,.gif,.png"
				className="absolute inset-0 opacity-0 cursor-pointer"
				onChange={ handleFileInputChange }
			/>

			<div className="text-center">
				<svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 m-auto mb-4 text-neutral-300" viewBox="0 0 20 20" fill="currentColor">
					<path fillRule="evenodd" d="M14.667 0H5.333A2.334 2.334 0 0 0 3 2.333v11.334c0 .89.506 1.684 1.298 2.077l3.398 1.699c.395.198.857.198 1.253 0l3.398-1.699a2.332 2.332 0 0 0 1.298-2.077V4.667c0-.647-.373-1.223-.954-1.493l-3.446-1.723a.666.666 0 0 0-.592 0L4.954 3.174a1.332 1.332 0 0 0-.954 1.493v11.334c0 .737.563 1.333 1.333 1.333h9.334c.77 0 1.333-.596 1.333-1.333V2.333c0-.737-.563-1.333-1.333-1.333z" clipRule="evenodd" />
					<path fillRule="evenodd" d="M5.5 5.5A1.5 1.5 0 0 0 4 7v6a1.5 1.5 0 0 0 3 0V7a1.5 1.5 0 0 0-1.5-1.5zM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM12 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" clipRule="evenodd" />
				</svg>
				<p className="text-sm text-gray-600">
					<span className="font-medium text-gray-900">Select</span> an Image
				</p>
			</div>
		</div>


	);
};

export default FileUpload;