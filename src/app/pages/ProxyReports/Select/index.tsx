import React, { useState, useCallback, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import './style.scss';
import GeoDatepicker from '@components/form-controls/Datepicker';
import { CalendarIcon} from '@utils/svg-icons';

export interface IInputProps {
	label: string;
	dropdownOptions: any;
	setSelected: any;
	dateRange: any;
	setDateRange: (data: any) => void
}

export const Select = ({ label, dropdownOptions, setSelected, dateRange, setDateRange }: IInputProps) => {
	const [open, setOpen] = useState(false);

	const onDateHandler = useCallback(
		(data: any) => {
			setDateRange(data);
			setSelected("custom", "Date range");
		},
		[dateRange],
	);


	const generateSelected = (label, dropdownOptions) => {
		let labels = dropdownOptions.options.filter(({ checked }) => checked);

		if (labels.length <= 0) {
			return <div className="text-base">All</div>;
		} else {
			return labels.map(elem => {
				return (
					<div key={elem.id} style={{ width: 'fit-content' }} 
					  onClick={(e) => {
						e.stopPropagation()
						setSelected(elem.value, label);
					}}
					className="flex m-1 items-center justify-between border border-gray-300 p-1 rounded-md cursor-pointer">
						{dropdownOptions.name === 'Country' ? (
							<>
								<div className="mr-2 iconWrapper">{elem.icon}</div>
								<div>{elem.value.toUpperCase()}</div>
							</>
						) : (
							<div>{elem.label}</div>
						)}
						<div
							className="ml-2 cursor-pointer"
						>
							<img src={process.env.PUBLIC_URL + '/assets/icons/small-close.svg'}></img>
						</div>
					</div>
				);
			});
		}
	};

	return (
		<div>
			<label htmlFor="location" className="block text-sm font-medium text-gray-700 pb-1.5	">
				{label}
			</label>
			<div
				onClick={() => {
					setOpen(!open);
				}}
				id="location"
				style={{
					minHeight: "44px", 
					boxShadow: `${open ? '0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #F4EBFF' : 'none'}`,
					border: `${open ? '1px solid #D6BBFB' : '1px solid #CDCDCD'}`,

				}}
				className={`mt-1 flex justify-between border items-center rounded-lg w-full pl-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md cursor-pointer`}
			>
				<div className="flex flex-wrap">{generateSelected(label, dropdownOptions)}</div>
				<div className="mr-3" style={{ width: '20px', height: '20px' }}>
					{open ? (
						<>
							<ChevronUpIcon fill="#667085" />
						</>
					) : (
						<>
							<ChevronDownIcon fill="#667085" />
						</>
					)}
				</div>
			</div>
			<div className="shadow-lg shadow-[#101828] rounded-lg overflow-y-scroll	max-h-80 pt-1" >
				{open &&
					dropdownOptions.options.map((option, index) => {
						if (option.label === "Custom") {
              return (
								<div className="p-5">
									<GeoDatepicker onChangeValue={onDateHandler} label="Date" range isClearable size="lg" wrapperStyle={{ maxWidth: 270 }} leadingIcon={CalendarIcon()} />
								</div>
							);
						} else {
							return (
								<div
									className={`${option.checked && 'bg-gray-50'} cursor-pointer w-full p-5 flex justify-between items-center`}
									onClick={() => {
										setSelected(option.value, label);
									}}
									key={option.id}
								>
									<div className="flex items-center">
										{option.icon && <div className="mr-2 iconWrapper">{option.icon}</div>}
										<div className="text-gray-900">{option.label}</div>
										{dropdownOptions.name === 'Country' && option.checked && <div className="text-gray-500 ml-2">{`${option.value.toUpperCase()}`}</div>}
									</div>
	
									{option.checked && (
										<div>
											<img src={process.env.PUBLIC_URL + '/assets/icons/checked.svg'}></img>
										</div>
									)}
								</div>
							);
						}
					})}
			</div>
		</div>
	);
};
