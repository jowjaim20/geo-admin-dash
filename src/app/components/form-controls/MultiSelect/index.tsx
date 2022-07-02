import React, { Fragment, useState, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { SelectorIcon } from '@utils/svg-icons';

type OptionItem = { label: string | number; value: any; checked: boolean; disabled?: boolean; icon?: any };
type SizeTypes = 'sm' | 'md' | 'lg' | 'xl';

interface IGeoMultiSelect {
	style?: React.CSSProperties;
	placeholder: string;
	options?: OptionItem[];
	name?: string;
	selectedLabel?: string;
	onChange?: any;
	value?: OptionItem[];
	multiSelect?: boolean;
	message?: { type: 'error' | 'info'; text: string };
	disabled?: boolean;
	className?: string;
	hasError?: boolean;
	size?: SizeTypes;
}

const GeoMultiSelect = (props: IGeoMultiSelect) => {
	const {
		style = { height: 48 },
		placeholder = '',
		options = [],
		name = '',
		selectedLabel = 'selected',
		onChange,
		value,
		multiSelect = false,
		message = {} as { type: 'error' | 'info'; text: string },
		disabled = false,
		className = '',
		hasError = false,
		size = 'md',
	} = props;
	const [items, setItems] = useState([] as OptionItem[]);
	const [checkAll] = useState(false);
	const [selected, setSelected] = useState([] as OptionItem[]);
	const BULK_RENDER = 10;

	useEffect(() => {
		if (options) {
			setItems(options.slice(0, BULK_RENDER));
			setSelected(value as OptionItem[]);
		}
		return () => {
			setItems([]);
		};
	}, [options]);

	//*Uncomment when check all option is needed
	// const onSelectCheckAll = () => {
	// 	setItems(items.map(d => ({ ...d, checked: checkAll ? false : true })));
	// 	setSelected(checkAll ? [] : options);
	// 	setCheckAll(!checkAll);
	// 	checkAll ? onChange([]) : onChange(options);
	// };

	const onCheck = e => {
		let data = [...items];
		data.forEach(d => {
			if (d.value === parseInt(e.target.value)) {
				if (multiSelect) {
					d.checked = e.target.checked;
				} else {
					selected.length !== 1 ? (d.checked = e.target.checked) : (d.checked = false);
				}
			}
		});
		setItems(data);
		setSelected(data.filter(d => d.checked));
		onChange(data.filter(d => d.checked));
	};

	const handleScroll = e => {
		const bottom = e.target.scrollHeight - parseInt(e.target.scrollTop) === e.target.clientHeight;
		if (bottom) {
			if (items.length < options.length) {
				//@ts-ignore
				setItems([...items.concat(options.slice(items.length, items.length + BULK_RENDER).map(item => ({ ...item, checked: checkAll })) as OptionItem[])]);
			}
		}
	};

	const { inputClassName } = generateClassName(size, hasError || message.type === 'error', disabled, className);

	return (
		<div className="geo-multi-select w-full">
			<Popover.Group className="">
				<Popover as="div" key={name} id="desktop-menu" className={inputClassName} style={style}>
					<Fragment>
						<Popover.Button className="group h-full w-full text-left items-center justify-center text-sm font-medium text-gray-700">
							<span className="flex justify-between text-subtle-500">
								{selected.length === 0 ? (
									<span>{placeholder}</span>
								) : (
									<span className="whitespace-nowrap text-white">
										{selected.length} {selectedLabel}
									</span>
								)}
								{SelectorIcon}
							</span>
						</Popover.Button>
					</Fragment>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Popover.Panel
							onScroll={handleScroll}
							className="origin-top-right max-h-60 overflow-auto w-full absolute z-10 right-0 mt-2 bg-background-code rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
						>
							<div className="">
								{/*Uncomment when check all option is needed*/}
								{/*{multiSelect && (*/}
								{/*	<div className="flex items-center w-full">*/}
								{/*		<span onClick={onSelectCheckAll} className="text-sm font-medium text-support-1-base whitespace-nowrap w-full">*/}
								{/*			{checkAll ? 'Unselect all' : 'Select all'}*/}
								{/*		</span>*/}
								{/*	</div>*/}
								{/*)}*/}

								{items.map((option, optionIdx) => (
									<div key={option.value} className={`flex py-2 px-2.5 items-center w-full hover:bg-subtle-800 ${option.disabled && 'bg-subtle-700 cursor-not-allowed disabled'}`}>
										<input
											disabled={option.disabled}
											id={`filter-${optionIdx}`}
											name={name}
											defaultValue={option.value}
											type="checkbox"
											checked={option.checked}
											onChange={onCheck}
											className={`h-4 w-4 text-support-2-base rounded focus:ring-support-2-base ${option.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
										/>
										<label
											htmlFor={`filter-${optionIdx}`}
											className={`pl-3 pr-6 text-sm font-medium text-support-1-base whitespace-nowrap w-full ${option.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
										>
											{option.label}
										</label>
									</div>
								))}
							</div>
						</Popover.Panel>
					</Transition>
				</Popover>
			</Popover.Group>
			{message && message.text && <p className={`mt-1.5 ${message.type === 'error' ? 'err-msg text-error-500' : 'info-msg text-subtle-200'}`}>{message.text}</p>}
		</div>
	);
};

const generateClassName = (size: string, hasError: boolean, disabled: boolean, className: string) => {
	const errorClass = hasError ? 'input-error border-alert-900' : 'border-subtle-700';
	// const disabledClass = disabled
	// 	? 'bg-background-container border-subtle-600'
	// 	: '';
	const inputClassName = `relative w-full bg-background-code focus:outline-none focus:shadow-none focus:ring-transparent ring-0 inline-block border-2 px-2 py-1 rounded ${errorClass}`;

	return { inputClassName };
};

export default GeoMultiSelect;
