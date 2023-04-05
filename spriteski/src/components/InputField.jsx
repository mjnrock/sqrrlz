import { useState } from "react";

export function InputField({ label, name, type = "text", value, onChange, required }) {
	const [ isFocused, setIsFocused ] = useState(false);

	const handleFocus = () => setIsFocused(true);
	const handleBlur = () => setIsFocused(false);

	const labelClasses = `absolute left-2 top-1 transition-all duration-300 pointer-events-none font-sans ${ isFocused || value ? "text-gray-600 text-xs top-[-18px]" : "text-gray-400 text-sm"
		}`;

	const inputClasses = `w-full h-12 min-h-full px-3 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`;

	return (
		<div className="relative w-full">
			<label className={ labelClasses } htmlFor={ name }>
				{ label }
				{ required && <span className="text-red-500">*</span> }
			</label>
			<input
				className={ inputClasses }
				type={ type }
				name={ name }
				value={ value }
				onChange={ onChange }
				onFocus={ handleFocus }
				onBlur={ handleBlur }
				required={ required }
			/>
		</div>
	);
}

export default InputField;