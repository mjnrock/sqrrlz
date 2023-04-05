import { useState, useRef, useEffect } from "react";

import { InputField } from "../components/InputField";
import { Dropdown } from "../components/Dropdown";

function Default() {
	const [ image, setImage ] = useState(null);
	const canvasRef = useRef(null);

	const [ name, setName ] = useState("");
	const [ category, setCategory ] = useState("");

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
		const context = canvas.getContext("2d");
		if(image) {
			canvas.width = image.width;
			canvas.height = image.height;
			context.drawImage(image, 0, 0);
		}
	}, [ image ]);

	function handleButtonClick() {
		document.getElementById("fileInput").click();
	}

	const handleCategoryChange = (event) => {
		setCategory(event.target.value);
	};

	const categoryOptions = [
		{ label: "Books", value: "books" },
		{ label: "Electronics", value: "electronics" },
		{ label: "Clothing", value: "clothing" },
	];

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div>
				<canvas
					ref={ canvasRef }
					className={ `p-4 border border-gray-200 hover:border-gray-300 border-solid rounded shadow-lg cursor-pointer` + (image ? "" : " hidden") }
				/>
			</div>

			<div className="flex flex-col w-full max-w-md p-4 space-y-5">
				<InputField
					label="Name"
					name="name"
					type="text"
					value={ name }
					onChange={ (event) => setName(event.target.value) }
					placeholder="Enter your name"
					required
				/>

				<InputField
					label="Name"
					name="name"
					type="text"
					value={ name }
					onChange={ (event) => setName(event.target.value) }
					placeholder="Enter your name"
					required
				/>

				<Dropdown
					label="Category"
					name="category"
					value={ category }
					onChange={ handleCategoryChange }
					options={ categoryOptions }
					required
				/>
			</div>

			<div>
				<input
					type="file"
					id="fileInput"
					accept=".jpg,.jpeg,.gif,.png"
					className="hidden"
					onChange={ handleFileInputChange }
				/>
				<button
					className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
					onClick={ handleButtonClick }
					style={ { fontFamily: "'Fredoka One', cursive" } } // Add font family
				>
					Choose File
				</button>
			</div>
		</div>
	);
}

export default Default;
