import React from 'react';
import { capitalizeFirstLetter } from '@utils/helper';
import GeoInput, { IInputProps } from '@components/form-controls/Input';
import GeoSelect, { ISelectProps } from '@components/form-controls/Select';
import GeoTextarea, { ITextareaProps } from '@components/form-controls/Textarea';

const generateError = error => {
	return (
		error && {
			type: 'error',
			text: error.message,
		}
	);
};

export interface IWrapperInputProps extends IInputProps {
	errors: any;
}

const InputWrapper = (props: IWrapperInputProps) => {
	const { name = '', placeholder, label, type, size, disabled, required, variant, dropdownOptions, leadingText, leadingIcon, trailingIcon, errors, inputProps } = props;
	return (
		<GeoInput
			key={`key-${name}`}
			placeholder={placeholder}
			label={label}
			type={type}
			size={size}
			variant={variant}
			disabled={disabled}
			message={generateError(errors[name])}
			inputProps={{ ...inputProps }}
			leadingIcon={leadingIcon}
			trailingIcon={trailingIcon}
			dropdownOptions={dropdownOptions}
			leadingText={leadingText}
			destructive={generateError(errors[name])}
			required={required}
			name={name}
		/>
	);
};

export interface ISelectWrapperProps extends ISelectProps {
	control: any;
	setError: any;
	clearErrors: any;
	errors: any;
	Controller: any;
}

const SelectWrapper = (props: ISelectWrapperProps) => {
	const { Controller, size, control, setError, clearErrors, errors, label, name = '', options, leftChild, placeholder, required = true, searchable = false } = props;
	const onSelectChange = (val, onChange) => {
		if (!val || val === undefined) {
			setError(name, { type: 'manual', message: `${capitalizeFirstLetter(name)} is required` });
			return;
		} else {
			clearErrors(name);
		}

		onChange(val);
	};

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={''}
			rules={{ required: required && `${capitalizeFirstLetter(name)} is required` }}
			render={({ field: { onChange, onBlur, value } }) => (
				<GeoSelect
					size={size}
					label={label}
					name={name}
					options={options}
					placeholder={placeholder}
					hasError={errors[name]}
					message={generateError(errors[name])}
					leftChild={leftChild}
					onChange={val => onSelectChange(val, onChange)}
					selected={value}
					searchable={searchable}
					required={required}
					destructive={generateError(errors[name])}
				/>
			)}
		/>
	);
};

export interface ITextareaWrapperProps extends ITextareaProps {
	errors: any;
}

const TextAreaWrapper = (props: ITextareaWrapperProps) => {
	const { errors, inputProps, name = '', label, placeholder, variant, size } = props;
	return (
		<div className="input-container">
			<GeoTextarea
				name={name}
				type={'text'}
				size={size}
				inputProps={{ ...inputProps }}
				label={label}
				placeholder={placeholder}
				hasError={errors[name]}
				message={generateError(errors[name])}
				variant={variant}
			/>
		</div>
	);
};

export { InputWrapper, generateError, SelectWrapper, TextAreaWrapper };
