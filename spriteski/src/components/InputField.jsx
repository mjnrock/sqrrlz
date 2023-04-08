export function InputText({ type = "text", label, value, placeholder, onChange, className, ...props }) {
	return (
		<div className="block mt-4 text-xs italic text-gray-700">
			{ label }
			<input
				type={ type }
				value={ value }
				onChange={ onChange }
				placeholder={ placeholder }
				className={ `w-full px-4 py-2 mt-1 border border-gray-300 border-solid rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm hover:border-gray-400` + (className ? ` ${ className }` : "") }
				{ ...props }
			/>
		</div>
	);
};

export default InputText;