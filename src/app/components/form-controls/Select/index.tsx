import React, { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon } from '@utils/svg-icons';
import GeoInput from '../Input';
import cn from 'classnames';

type InputTypes = 'text' | 'password';
type SizeTypes = 'sm' | 'md' | 'lg' | 'xl';

type SelectItem = { label: string; value: any; icon?: any };
export type OptionItem = { label: string; value: any; disabled?: boolean; icon?: any };
type InputVariantTypes = 'primary' | 'secondary' | 'tertiary';

export interface ISelectProps {
	placeholder?: string;
	label?: string;
	size?: SizeTypes;
	icon?: any;
	name?: string;
	type?: InputTypes;
	rightChild?: any;
	leftChild?: any;
	hasError?: boolean;
	className?: string;
	disabled?: boolean;
	searchableInputProps?: any;
	message?: { type: 'error' | 'info'; text: string };
	selected?: SelectItem | undefined | null;
	options?: OptionItem[];
	onChange?: (e: any) => void;
	selectProps?: any;
	searchable?: boolean;
	required?: boolean;
	variant?: InputVariantTypes;
	destructive?: boolean;
}

const inputSize = {
	sm: 'input-sm text-base',
	md: 'input-md text-base',
	lg: 'input-lg text-base',
	xl: 'input-xl text-base',
};

const selectVariantClass = {
	primary: {
		default: 'bg-white text-subtle-800 border-gray-300 focus:border-gray-300 ',
		destructive: 'bg-white text-gray-500 border-error-300 focus:border-error-300',
		disabled: 'bg-gray-50 text-subtle-400 border-primary-100 focus:border-primary-100 cursor-not-allowed',
	},
	secondary: {
		default: 'bg-white text-subtle-800 border-gray-300 focus:border-gray-300 ',
		destructive: 'bg-white text-gray-500 border-error-300 focus:border-error-300',
		disabled: 'bg-gray-50 text-subtle-400 border-primary-100 focus:border-primary-100 cursor-not-allowed',
	},
	tertiary: {
		default: 'bg-white text-subtle-800 border-gray-300 focus:border-gray-300 ',
		destructive: 'bg-white text-gray-500 border-error-300 focus:border-error-300',
		disabled: 'bg-gray-50 text-subtle-400 border-primary-100 focus:border-primary-100 cursor-not-allowed',
	},
};

// @ts-ignore
const GeoSelect: React.FC<ISelectProps> = props => {
	const {
		placeholder,
		label,
		size = 'md',
		name = `input-${Math.random()}`,
		leftChild,
		hasError = false,
		className = '',
		disabled = false,
		selected,
		message = {} as { type: 'error' | 'info'; text: string },
		options = [],
		onChange,
		selectProps,
		searchable = false,
		required = false,
		searchableInputProps,
		variant = 'primary',
		destructive = false,
	} = props;

	const [items, setItems] = useState([] as OptionItem[]);

	const BULK_RENDER = 10;

	const generateWrapperClass = (variant: InputVariantTypes, size: string, hasError: boolean, disabled: boolean, className: string, destructive: boolean) => {
		const sizeClass = inputSize[size];
		// const errorClass = hasError ? 'input-error border-alert-900' : 'border-subtle-700';
		const wrapperClass = cn(`input-wrapper flex flex-wrap items-stretch items-center rounded`, {});

		const wrapperOptionsClass = 'bg-white';
		const optionsClass = 'bg-white p-3 text-subtle-800 cursor-pointer hover:bg-gray-50';

		const inputClassName = cn(
			`border relative w-full input-root flex-shrink flex-grow flex-auto outline-none w-px border-0 rounded-md pl-3 pr-10 text-left cursor-default focus:outline-none focus:outline-none focus:shadow-none focus:ring-transparent ring-0 cursor-pointer ${sizeClass} ${className}`,
			{
				[selectVariantClass[variant].default]: !destructive && !disabled,
				[selectVariantClass[variant].destructive]: destructive && !disabled,
				[selectVariantClass[variant].disabled]: disabled,
			},
		);
		return { inputClassName, wrapperClass, wrapperOptionsClass, optionsClass };
	};

	const { inputClassName, wrapperClass, wrapperOptionsClass, optionsClass } = generateWrapperClass(variant, size, hasError || message.type === 'error', disabled, className, destructive);

	useEffect(() => {
		if (options) {
			setItems(options.slice(0, BULK_RENDER));
		}
		return () => {};
	}, [options]);

	const renderOptions = (options: OptionItem[] = []) => {
		if (!options) return <></>;
		return options.map((option, index) => (
			<Listbox.Option key={index} className={({ active }) => `${optionsClass} ${active ? 'bg-gray-50' : ''} ${option.disabled ? 'disabled-option' : ''}`} value={option} disabled={option.disabled}>
				{({ selected, active }) => (
					<div className="flex items-center">
						{option?.icon && <span className="mr-2">{option.icon}</span>}
						<span className={`${selected ? 'font-medium' : 'font-normal'} block`}>{option.label}</span>
					</div>
				)}
			</Listbox.Option>
		));
	};

	const handleScroll = e => {
		const bottom = parseInt(e.target.scrollHeight) - parseInt(e.target.scrollTop) === parseInt(e.target.clientHeight);
		if (bottom) {
			if (items.length < options.length) {
				setItems([...items.concat(options.slice(items.length, items.length + BULK_RENDER).filter(o => o) as OptionItem[])]);
			}
		}
	};

	const searchHandler = e => {
		let newOptions = options.filter(option => JSON.stringify(option.label).search(new RegExp(e.target.value, 'ig')) > -1);
		setItems(newOptions);
	};

	return (
		<div className={`geo-select-container geo-input-container-${size}`}>
			<Listbox value={selected} onChange={onChange} {...selectProps}>
				{({ open }) => (
					<>
						{label && (
							<div className="text-sm leading-5 font-medium text-gray-700 mb-1.5">
								<label htmlFor={name}>
									{label}
									{required && '*'}
								</label>
							</div>
						)}

						<div className={wrapperClass}>
							<Listbox.Button className={inputClassName}>
								<div className="flex items-center">
									{leftChild && <span className="mr-2">{leftChild}</span>}
									{!selected ? (
										<div className={`flex items-center`}>
											{
												// @ts-ignore
												selected ? (
													<span className="truncate placeholder">
														{/* @ts-ignore */}
														{selected.icon && <span className="mr-2">{selected.icon}</span>}
														{/* @ts-ignore */}
														{selected.label}
													</span>
												) : (
													<span className="text-gray-500 truncate placeholder">{placeholder}</span>
												)
											}
										</div>
									) : (
										<div className="flex items-center">
											{selected.icon && <span className="mr-2">{selected.icon}</span>}
											<span className="truncate">{selected.label}</span>
										</div>
									)}
								</div>
								<span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">{SelectorIcon}</span>
							</Listbox.Button>

							<Transition show={open && !disabled} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-1" leaveTo="opacity-0">
								<Listbox.Options
									onScroll={handleScroll}
									static
									className={`${wrapperOptionsClass} absolute z-10 w-full shadow-lg max-h-60 rounded-md text-white ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-sm inset-x-0`}
									style={{ marginTop: '3px' }}
								>
									{searchable && (
										<div className="sticky bg-secondary-base top-0 py-2 px-3 w-full z-10">
											<GeoInput
												placeholder="Search"
												variant="secondary"
												inputProps={{
													onChange: searchHandler,
												}}
												{...searchableInputProps}
											/>
										</div>
									)}
									{renderOptions(items as SelectItem[])}
									{items.length === 0 && (
										<div className="py-2 pl-3 pr-3 w-full">
											<span className="text-gray-50">No data</span>
										</div>
									)}
								</Listbox.Options>
							</Transition>
						</div>
					</>
				)}
			</Listbox>
			{message && message.text && <p className={`mt-1.5 text-sm ${message.type === 'error' ? 'err-msg ' : 'info-msg text-subtle-200'}`}>{message.text}</p>}
		</div>
	);
};

export default GeoSelect;
