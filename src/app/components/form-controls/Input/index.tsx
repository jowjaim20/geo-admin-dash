import React from 'react';
// import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import cn from 'classnames';

type InputtypeTypes = 'default' | 'payment' | 'leadingDropdown' | 'trailingDropdown' | 'leadingText';
type SizeTypes = 'sm' | 'md' | 'lg';
type InputTypes = 'text' | 'email' | 'password';
type InputVariantTypes = 'primary' | 'secondary' | 'tertiary';

export interface IInputProps {
	placeholder?: string;
	label?: string;
	message?: { type: 'error' | 'info'; text: string };
	leadingIcon?: any;
	leadingText?: string;
	trailingIcon?: any;
	dropdownOptions?: { label: string; value: string }[];
	name?: string;
	variant?: InputVariantTypes;
	className?: string;
	disabled?: boolean;
	style?: React.CSSProperties;
	size?: SizeTypes;
	type?: InputTypes;
	inputType?: InputtypeTypes;
	destructive?: boolean;
	required?: boolean;
	inputProps?: any;
}

const sizeClass = {
	sm: 'input-sm py-2 text-base font-normal',
	md: 'input-md py-2.5 text-base font-normal',
	lg: 'input-lg py-3 text-base font-normal',
};

const variantClass = {
	primary: {
		default: 'bg-white text-subtle-800 border-gray-300 focus:border-gray-300',
		destructive: 'bg-white text-gray-500 border-error-300 focus:border-error-300',
		disabled: 'bg-gray-50 text-subtle-400 border-primary-100 focus:border-primary-100 cursor-not-allowed',
	},
};

const GeoInput: React.FC<IInputProps> = props => {
	const {
		placeholder,
		label,
		message,
		variant = 'primary',
		name = `input-${Math.random()}`,
		style,
		disabled = false,
		leadingIcon,
		trailingIcon,
		dropdownOptions,
		leadingText,
		size = 'md',
		type = 'text',
		inputType = 'default',
		destructive = false,
		required = false,
		inputProps,
	} = props;

	const getClasses = () => {
		const wrapperDivClass = `inputWrapper ${leadingText ? 'flex' : ''} ${
			message?.type === 'error' || message?.type === 'info' || leadingIcon || trailingIcon || inputType === ('leadingDropdown' || 'trailingDropdown') ? 'relative rounded-md shadow-sm' : ''
		}`;

		const baseInputClass = cn(`shadow-sm block w-full px-3 outline-none ring-0 outline-0 focus:ring-0 focus:outline-0 focus-visible:outline-0 border ${sizeClass[size]}`, {
			[variantClass[variant].default]: !destructive && !disabled,
			[variantClass[variant].destructive]: destructive && !disabled,
			[variantClass[variant].disabled]: disabled,
		});

		const leadingTextClass = cn('inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm', {
			['border-error-300']: destructive && !disabled,
		});
		const inputClass = `${baseInputClass} ${leadingText ? 'flex-1 min-w-0 rounded-none rounded-r-md' : 'rounded-md'} ${
			inputType === 'leadingDropdown' ? (dropdownOptions![0].label?.length > 4 ? 'pl-24' : 'pl-16') : ''
		} ${leadingIcon ? 'pl-10' : ''}`;

		return { wrapperDivClass, inputClass, leadingTextClass };
	};

	const { wrapperDivClass, inputClass, leadingTextClass } = getClasses();

	return (
		<div key={`key-${name}}`} className="inputContainer" style={style}>
			{label && (
				<label htmlFor={name} className="inputLabel block text-sm leading-5 font-medium text-gray-700 mb-1.5">
					{label}
					{required && '*'}
				</label>
			)}
			<div className={wrapperDivClass}>
				{leadingText && <span className={leadingTextClass}>{leadingText}</span>}
				{leadingIcon && (
					<div className="absolute inset-y-0 left-0 pl-3 pointer-events-none flex items-center">{React.cloneElement(leadingIcon, { className: 'h-5 w-5 text-gray-400', 'aria-hidden': true })}</div>
				)}
				{inputType === 'leadingDropdown' && (
					<div className="absolute inset-y-0 left-0 flex items-center">
						<label htmlFor={name} className="sr-only">
							{label}
						</label>
						<select
							id={`id-${label}`}
							name={label}
							autoComplete={label?.toLowerCase()}
							className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
						>
							{dropdownOptions &&
								dropdownOptions.map((option, index) => (
									<option key={index} value={option.value}>
										{option.label}
									</option>
								))}
						</select>
					</div>
				)}
				<input type={type} name={name} id={`id-${name}`} className={inputClass} disabled={disabled} placeholder={placeholder} {...inputProps} />
				{/* {message?.type === 'error' && (
					<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
						<ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
					</div>
				)} */}
				{message?.type === 'info' && (
					<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
						<QuestionMarkCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
					</div>
				)}
				{inputType === 'trailingDropdown' && (
					<div className="absolute inset-y-0 right-0 flex items-center">
						<label htmlFor={name} className="sr-only">
							{label}
						</label>
						<select
							id={`id-${label}`}
							name={label}
							autoComplete={label?.toLowerCase()}
							className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
						>
							{dropdownOptions &&
								dropdownOptions.map((option, index) => (
									<option key={index} value={option.value}>
										{option.label}
									</option>
								))}
						</select>
					</div>
				)}
				{trailingIcon && <div className="absolute inset-y-0 right-0 pr-3 flex items-center">{React.cloneElement(trailingIcon, { className: 'h-5 w-5 text-gray-400', 'aria-hidden': true })}</div>}
			</div>
			{message?.text && (
				<p className={`mt-1.5 text-sm ${message?.type === 'error' ? 'text-error-500' : 'text-gray-500'}`} id={`id-${name}-${message?.type}`}>
					{message?.text}
				</p>
			)}
		</div>
	);
};

export default GeoInput;
