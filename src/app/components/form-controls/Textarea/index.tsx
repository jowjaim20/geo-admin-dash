import React from 'react';

type SizeTypes = 'small' | 'medium' | 'large' | 'xl';
type VariantTypes = 'primary' | 'secondary' | 'teritiary';

export interface ITextareaProps {
	placeholder?: string;
	label?: string;
	size?: SizeTypes;
	status?: string;
	name?: string;
	type?: string;
	hasError?: boolean;
	onClick?: (e: any) => void;
	className?: string;
	disabled?: boolean;
	inputProps?: any;
	message?: { type: 'error' | 'info'; text: string };
	style?: React.CSSProperties;
	value?: any;
	rightChild?: React.ReactElement;
	variant?: VariantTypes;
}

const textareaSize = {
	small: 'textarea-sm',
	medium: 'textarea-md',
	large: 'textarea-lg',
	xl: 'textarea-xl',
};

const variantClass = {
	primary: 'bg-white text-subtle-800 border-gray-300 focus:border-gray-300',
	secondary: 'bg-secondary-50 border-subtle-600 text-subtle-50',
	teritiary: 'bg-white border-subtle-100 text-subtle-400',
};

const generateWrapperClass = (size: string, hasError: boolean, disabled: boolean, className: string, variant: VariantTypes) => {
	const sizeClass = textareaSize[size];
	const errorClass = hasError ? 'input-error' : '';
	const wrapperClass = `textarea-wrapper relative wrapper-${sizeClass} ${errorClass} flex flex-wrap 
	${disabled ? 'bg-background-code ' : `${variantClass[variant]}`} 
	border items-stretch items-center overflow-hidden rounded-md`;

	const disbledClass = disabled ? 'bg-background-code' : `${variantClass[variant]} focus:outline-none focus:shadow-none focus:ring-transparent ring-0`;

	const textareaClassName = `input-root flex-shrink flex-grow flex-auto outline-none ${disbledClass} ${sizeClass} ${className} ${errorClass} w-px border-0 px-3 py-2`;
	return { textareaClassName, wrapperClass };
};

const GeoTextarea: React.FC<ITextareaProps> = props => {
	const {
		placeholder,
		label,
		value,
		status,
		size = 'medium',
		type = 'text',
		hasError = false,
		className = '',
		disabled = false,
		inputProps,
		message = {} as { type: 'error' | 'info'; text: string },
		style,
		rightChild,
		variant = 'primary',
	} = props;

	const { textareaClassName, wrapperClass } = generateWrapperClass(size, hasError || message.type === 'error', disabled, className, variant);

	return (
		<div className={`geo-textarea-container geo-input-container-${size}`} style={style}>
			{label && (
				<div className="text-sm leading-5 font-medium text-gray-700 mb-1.5">
					<label htmlFor="textarea">
						{label}
						{status && <span className="text-sm leading-5 font-medium  text-subtle-300">{status}</span>}
					</label>
				</div>
			)}

			<div className={wrapperClass}>
				<textarea rows="6" cols="50" type={type} name="textarea" placeholder={placeholder} className={textareaClassName} disabled={disabled} {...inputProps} defaultValue={value} />
				{rightChild && <span className="textarea-right-icon absolute">{rightChild}</span>}
			</div>
			{message && message.text && <p className={`mt-1.5 ${message.type === 'error' ? 'err-msg text-error-500' : 'info-msg'}`}>{message.text}</p>}
		</div>
	);
};

export default GeoTextarea;
