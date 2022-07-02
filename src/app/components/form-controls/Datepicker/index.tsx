import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import cn from 'classnames';
import moment from 'moment';

type SizeTypes = 'sm' | 'md' | 'lg';
type InputVariantTypes = 'primary' | 'secondary' | 'tertiary';

export interface IDatepickerProps {
	key?: string;
	placeholder?: string;
	label?: string;
	message?: { type: 'error' | 'info'; text: string };
	leadingIcon?: any;
	trailingIcon?: any;
	name?: string;
	variant?: InputVariantTypes;
	className?: string;
	disabled?: boolean;
	style?: React.CSSProperties;
	size?: SizeTypes;
	range?: boolean;
	destructive?: boolean;
	required?: boolean;
	inputProps?: any;
	wrapperStyle?: React.CSSProperties;
	isClearable?: boolean;
	onChangeValue: (data: any) => void;
}

const sizeClass = {
	sm: 'datepicker-sm py-2 text-base font-normal',
	md: 'datepicker-md py-2.5 text-base font-normal',
	lg: 'datepicker-lg py-3 text-base font-normal',
};

const variantClass = {
	primary: {
		default: 'bg-white text-subtle-800 border-gray-300 focus:border-gray-300',
		destructive: 'bg-white text-gray-500 border-error-300 focus:border-error-300',
		disabled: 'bg-gray-50 text-subtle-400 border-primary-100 focus:border-primary-100 cursor-not-allowed',
	},
};

const GeoDatepicker = (props: IDatepickerProps) => {
	const {
		label,
		message,
		leadingIcon,
		trailingIcon,
		name,
		variant = 'primary',
		disabled,
		destructive,
		range = false,
		size = 'md',
		required = false,
		wrapperStyle,
		isClearable = false,
		onChangeValue,
	} = props;

	const [dateRange, setDateRange] = useState<any>([null, null]);
	const [startDate, endDate] = dateRange;

	useEffect(() => {
		if (dateRange[0] !== null && dateRange[1] !== null) {
			let newArr: any[] = [];
			newArr[0] = moment(dateRange[0]).unix();
			newArr[1] = moment(dateRange[1]).unix();
			onChangeValue(newArr);
		}
	}, [dateRange]);

	const getClasses = () => {
		const wrapperDivClass = `geoDatepicker-wrapper ${message?.type === 'error' || message?.type === 'info' || leadingIcon || trailingIcon}`;

		const baseInputClass = cn(`shadow-sm block w-full px-3 outline-none ring-0 outline-0 focus:ring-0 focus:outline-0 focus-visible:outline-0 border rounded-md ${sizeClass[size]}`, {
			[variantClass[variant].default]: !destructive && !disabled,
			[variantClass[variant].destructive]: destructive && !disabled,
			[variantClass[variant].disabled]: disabled,
		});

		const inputClass = `${baseInputClass} ${
			message?.type !== 'error' ? (message?.type === 'info' ? 'pr-10 border-gray-300' : '') : 'pr-10 border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
		} ${leadingIcon ? 'pl-10' : ''}`;

		return { wrapperDivClass, inputClass };
	};

	const { wrapperDivClass, inputClass } = getClasses();

	return (
		<div className={wrapperDivClass} style={wrapperStyle}>
			{label && (
				<label htmlFor={name} className="inputLabel block text-sm leading-5 font-medium text-gray-700 mb-1.5">
					{label}
					{required && '*'}
				</label>
			)}
			<div className="relative">
				{leadingIcon && <span className="absolute top-1/2 left-3 transform -translate-y-1/2 z-10">{leadingIcon}</span>}
				<DatePicker
					selectsRange={range}
					startDate={startDate}
					endDate={endDate}
					onChange={(update: any) => {
						setDateRange(update);
					}}
					isClearable={isClearable}
					className={inputClass}
				/>
			</div>
		</div>
	);
};

export default GeoDatepicker;
