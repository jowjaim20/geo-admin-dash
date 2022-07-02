import React from 'react';

type SizeTypes = 'small' | 'medium' | 'large' | 'xl';

interface ITextareaProps {
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
}

const textareaSize = {
	small: 'textarea-sm',
	medium: 'textarea-md',
	large: 'textarea-lg',
	xl: 'textarea-xl',
};

const generateWrapperClass = (size: string, hasError: boolean, disabled: boolean, className: string) => {
	const sizeClass = textareaSize[size];
	const errorClass = hasError ? 'input-error' : '';
	const wrapperClass = `textarea-wrapper relative wrapper-${sizeClass} ${errorClass} flex flex-wrap 
	${disabled ? 'bg-background-code ' : 'bg-background-container border-subtle-700'} 
	border-2 items-stretch items-center rounded`;

	const disbledClass = disabled ? 'bg-background-code' : 'bg-background-container focus:outline-none focus:shadow-none focus:ring-transparent ring-0';

	const textareaClassName = `input-root text-subtle-50 flex-shrink flex-grow flex-auto outline-none ${disbledClass} ${sizeClass} ${className} ${errorClass} w-px border-0`;
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
	} = props;

	const { textareaClassName, wrapperClass } = generateWrapperClass(size, hasError || message.type === 'error', disabled, className);

	return (
		<div className={`geo-textarea-container geo-input-container-${size}`} style={style}>
			<div className="mb-2">
				<label htmlFor="textarea">
					{label}
					{status && <span className="text-sm leading-5 font-medium  text-subtle-300">{status}</span>}
				</label>
			</div>

			<div className={wrapperClass}>
				<textarea rows="6" cols="50" type={type} name="textarea" placeholder={placeholder} className={textareaClassName} disabled={disabled} {...inputProps} defaultValue={value} />
				{rightChild && <span className="textarea-right-icon absolute">{rightChild}</span>}
			</div>
			{message && message.text && <p className={`mt-1 ${message.type === 'error' ? 'err-msg text-error-500' : 'info-msg'}`}>{message.text}</p>}
		</div>
	);
};

export default GeoTextarea;
