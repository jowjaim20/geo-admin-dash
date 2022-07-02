import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputWrapper, ISelectWrapperProps, ITextareaWrapperProps, IWrapperInputProps, SelectWrapper, TextAreaWrapper } from '@utils/forms-utils';
import { CalendarIcon, CloseIcon, DotICon } from '@utils/svg-icons';
import { GeoButton } from '@components/form-controls/Button';
import { slideoverService, utilsService } from '@services/index';
import GeoDatepicker from '@components/form-controls/Datepicker';
import AssigneeSlideover from '@components/Slideovers/components/AssigneeSlideover';
import Badge from '@components/Badge';
import { SERVICE_URL } from '@utils/constants';
import Header from '@components/Header';

interface CreateUpdateTrailProps {
	data?: any;
	saveData: (data: any) => void;
	cancel: () => void;
}

const CreateUpdateTrial = (props: CreateUpdateTrailProps) => {
	const { saveData, cancel } = props;
	const {
		control,
		register,
		getValues,
		setValue,
		setError,
		clearErrors,
		handleSubmit,
		formState: { errors },
		// reset,
		watch,
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			planId: '',
			planDisplayName: '',
			serviceType: { label: 'RESIDENTIAL-UNMETERED', value: 'RESIDENTIAL-UNMETERED' },
			units: '',
			status: { label: 'Active', value: 'active', icon: DotICon({ size: 10, color: '#12B76A' }) },
			price: '',
			notes: '',
		},
	});

	// const [data, setData] = useState<any>(null);
	const [assignee, setAssignee] = useState<any[]>([]);
	const [planId, setPlanId] = useState('');
	const [dateRange, setDateRange] = useState<any[]>([null, null]);

	const inputs = {
		planId: {
			name: 'planId',
			label: 'Plan ID',
			placeholder: 'Plan ID',
			size: 'lg',
			disabled: true,
			required: true,
			errors,
			inputProps: { value: planId },
		},
		planDisplayName: {
			name: 'planDisplayName',
			label: 'Plan name',
			placeholder: 'Plan name',
			size: 'lg',
			required: true,
			errors,
			inputProps: { ...register('planDisplayName', { required: 'Plan name is required' }) },
		},
		serviceType: {
			Controller,
			control,
			setError,
			clearErrors,
			errors,
			name: 'serviceType',
			label: 'Service type',
			placeholder: 'Service type',
			size: 'lg',
			required: true,
			inputProps: { ...register('serviceType', {}) },
			options: [
				{ label: 'RESIDENTIAL-UNMTERED', value: 'RESIDENTIAL-UNMETERED' },
				{ label: 'RESIDENTIAL-PREMIUM', value: 'RESIDENTIAL-PREMIUM' },
				{ label: 'RESIDENTIAL-PRIVATE', value: 'RESIDENTIAL-PRIVATE' },
			],
		},
		units: {
			name: 'units',
			label: 'Unit',
			placeholder: 'Unit',
			size: 'lg',
			required: true,
			errors,
			inputProps: {
				...register('units', {
					required: 'Service unit is required',
					validate: (value: any) => {
						if (isNaN(value)) {
							return 'Must be a number';
						}
					},
				}),
			},
		},
		status: {
			Controller,
			control,
			setError,
			clearErrors,
			errors,
			name: 'status',
			label: 'Status',
			placeholder: 'Status',
			size: 'lg',
			required: true,
			inputProps: { ...register('status', {}) },
			options: [
				{ label: 'Active', value: 'active', icon: DotICon({ size: 10, color: '#12B76A' }) },
				{ label: 'Inactive', value: 'inactive', icon: DotICon({ size: 10, color: '#F04438' }) },
			],
		},

		price: {
			name: 'price',
			label: 'Price',
			placeholder: 'Price',
			size: 'lg',
			required: true,
			errors,
			inputProps: {
				...register('price', {
					required: 'Plan price is required',
					validate: (value: any) => {
						if (isNaN(value)) {
							return 'Must be a number';
						}
					},
				}),
			},
			leadingText: '$',
		},
		notes: {
			errors,
			label: 'Note',
			placeholder: 'Note',
			name: 'notes',
			inputProps: {
				...register('notes', {
					validate: value => {
						if (value.length >= 50) {
							return 'Maximum character of 50 char.';
						}
					},
				}),
				maxLength: 50,
				rows: 4,
			},
		},
	};

	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			let newArr: any[] = [];
			if (Object.keys(value.serviceType).length !== 0) {
				// @ts-ignore
				newArr[0] = `${SERVICE_URL[value.serviceType?.value]}-custom`;
				if (value.units) {
					newArr[2] = value.units;
					if (value.price) {
						let price = parseFloat(value.price).toString().replace(/\./g, '');
						newArr[1] = price;
					}
				}
			}
			if (newArr.length !== 0) {
				setPlanId(newArr.join('-'));
			}
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	const onSaveData = (data: any) => {
		const payload = {
			...getValues(),
			planId,
			assignee,
			periodFrom: dateRange ? dateRange[0] : null,
			periodTo: dateRange ? dateRange[1] : null,
			// @ts-ignore
			status: getValues('status')?.value,
			// @ts-ignore
			serviceType: getValues('serviceType')?.value,
			units: Number(getValues('units')),
			price: Number(getValues('price')),
		};
		saveData(payload);
	};

	const onSaveAssignee = useCallback(
		(data: any) => {
			setAssignee((prev: any[]) => prev.concat(data));
		},
		[assignee],
	);

	const openAssigneeSlideover = () => {
		slideoverService.openSlideover({
			title: 'Assign to',
			render: ({ currSlideover, handleClose }) => <AssigneeSlideover {...{ currSlideover, handleClose, onSavedata: onSaveAssignee }} />,
		});
	};

	const onDeleteAssignee = useCallback(
		(data: string) => {
			setAssignee((prev: any[]) => prev.filter(a => a !== data));
		},
		[assignee],
	);

	const onDateHandler = useCallback(
		(data: any) => {
			setDateRange(data);
		},
		[dateRange],
	);

	return (
		<div className="relative">
			<Header title="Create new trial" actionLabel="Save" cancelHandler={() => cancel()} actionHandler={handleSubmit(onSaveData)} />
			<div className="m-auto mt-8" style={{ maxWidth: 448 }}>
				<div className="flex item-center flex-col gap-16">
					<div className="">
						<div className="text-gray-900 font-semibold text-lg pb-5">
							<h3 className="mb-1">Plan details</h3>
							<p className="font-normal text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
						<div className="border-b border-gray-200 my-5"></div>

						<form className="grid gap-6">
							<div>
								<InputWrapper {...(inputs.planId as IWrapperInputProps)} />
							</div>
							<div>
								<InputWrapper {...(inputs.planDisplayName as IWrapperInputProps)} />
							</div>
							<div>
								<SelectWrapper {...(inputs.serviceType as ISelectWrapperProps)} />
							</div>
							<div>
								<InputWrapper {...(inputs.units as IWrapperInputProps)} />
							</div>
							<div>
								<SelectWrapper {...(inputs.status as ISelectWrapperProps)} />
							</div>
						</form>
					</div>

					<div className="section">
						<div className="text-gray-900 font-semibold text-lg pb-5">
							<h3 className="mb-1">Assignee</h3>
							<p className="font-normal text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
						<div className="border-b border-gray-200 my-5"></div>

						<div className="grid gap-6">
							<div>
								<div className="text-sm leading-5 font-medium text-gray-700 mb-1.5">
									<label htmlFor="">Assignee</label>
								</div>
								<GeoButton label={`Assign to${assignee.length !== 0 ? ` (${assignee.length})` : ''}`} onClick={openAssigneeSlideover} />

								{assignee.length !== 0 && (
									<div className="mt-1.5 flex flex-wrap gap-2 ">
										{assignee.map(a => (
											<Badge key={a} label={a} variant="secondary" rightChild={CloseIcon(16)} rightChildClick={onDeleteAssignee} />
										))}
									</div>
								)}
							</div>
						</div>
					</div>

					<div className="section">
						<div className="text-gray-900 font-semibold text-lg pb-5">
							<h3 className="mb-1">Pricing</h3>
							<p className="font-normal text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
						<div className="border-b border-gray-200 my-5"></div>

						<div className="grid gap-6">
							<div>
								<InputWrapper {...(inputs.price as IWrapperInputProps)} />
							</div>
						</div>
					</div>

					<div className="section">
						<div className="text-gray-900 font-semibold text-lg pb-5">
							<h3 className="mb-1.5">Period</h3>
							<p className="font-normal text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
						<div className="border-b border-gray-200 my-5"></div>

						<div className="grid gap-6">
							<div>
								<GeoDatepicker onChangeValue={onDateHandler} label="Date" range isClearable size="lg" wrapperStyle={{ maxWidth: 270 }} leadingIcon={CalendarIcon()} />
							</div>
						</div>
					</div>

					<div className="section">
						<div className="text-gray-900 font-semibold text-lg pb-5">
							<h3 className="mb-1">Note</h3>
							<p className="font-normal text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
						<div className="border-b border-gray-200 my-5"></div>

						<div className="grid gap-6">
							<div>
								<TextAreaWrapper {...(inputs.notes as ITextareaWrapperProps)} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateUpdateTrial;
