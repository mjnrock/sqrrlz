import { useState } from "react";

export function Dropdown({ label, name, value, onChange, options, required }) {
	const [ isFocused, setIsFocused ] = useState(false);

	const handleFocus = () => setIsFocused(true);
	const handleBlur = () => setIsFocused(false);

	const labelClasses = `absolute left-2 top-1 z-10 transition-all duration-300 pointer-events-none font-sans ${ isFocused || value ? "text-gray-600 text-xs top-[-18px]" : "text-gray-400 text-sm"
		}`;

	const dropdownClasses = `relative w-full bg-white rounded shadow focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:outline-none`;

	const buttonClasses = `relative h-12 min-h-full w-full py-2 pl-3 pr-10 text-left rounded shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`;

	const optionsClasses = `absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded shadow max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none z-10`;

	const optionClasses = `w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer`;

	const [ selectedOption ] = options.filter((option) => option.value === value);

	return (
		<div className="relative w-full">
			<label className={ labelClasses } htmlFor={ name }>
				{ label }
				{ required && <span className="text-red-500">*</span> }
			</label>
			<div className={ dropdownClasses }>
				<button className={ buttonClasses } type="button" onClick={ handleFocus }>
					{ selectedOption?.label }
				</button>
				<div className={ optionsClasses } style={ { display: isFocused ? "block" : "none" } }>
					{ options.map((option) => (
						<div
							key={ option.value }
							className={ optionClasses }
							onClick={ () => {
								onChange({ target: { name, value: option.value } });
								setIsFocused(false);
							} }
						>
							{ option.label }
						</div>
					)) }
				</div>
			</div>
		</div>
	);
}

export default Dropdown;
