import React from 'react';

interface Props {
	label?: React.HTMLProps<HTMLSpanElement> | string;
	size?: sizesTypes;
	onChange?: (val: any) => void;
	disabled?: boolean;
	checked?: boolean;
	name?: string;
	checkboxProps?: object;
	message?: { type: 'error' | 'info'; text: string };
	hasError?: boolean;
}

// default medium
type sizesTypes = 'small' | 'medium' | 'large';

const GeoCheckbox = (props: Props) => {
	const { label, name, size, disabled, checked, onChange, checkboxProps, message, hasError } = props;
	let sizeDisplay = '';
	if (size === 'large') {
		sizeDisplay = `h-5 w-5`;
	} else {
		// medium
		sizeDisplay = `h-4 w-4`;
	}
	const errorClass = hasError ? 'input-error' : '';
	const inputClassName = `rounded ${sizeDisplay} ${errorClass}
  ${disabled ? 'hover:bg-transparent' : 'bg-secondary-100 text-support-2-base focus:ring-support-2-base border-gray-600 rounded'}`;
	const labelClassName = `text-xs leading-4 font-normal border-primary-400 hover:bg-transparent
  ${disabled ? 'text-subtle-600 ring-offset-0 ring-primary-10' : 'text-subtle-300'}
  `;
	return (
		<div className="geo-checkbox-container flex flex-col m-px">
			<div className="flex">
				<div className={`flex items-center ${disabled ? 'disabled' : ''}`} {...checkboxProps}>
					<input id={name} name={name} type="checkbox" checked={checked} className={inputClassName} disabled={disabled} onChange={val => onChange && !disabled && onChange(val)} {...checkboxProps} />
				</div>
				<div className="ml-3 text-sm">
					<label htmlFor={name} className={labelClassName}>
						{label}
					</label>
				</div>
			</div>
			<div>{message && message.text && <p className={`mt-1.5 text-xs ${message.type === 'error' ? 'err-msg text-error-500' : 'info-msg text-subtle-200'}`}>{message.text}</p>}</div>
		</div>
	);
};
export default GeoCheckbox;
