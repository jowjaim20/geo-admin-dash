import React, { useEffect, useState } from 'react';
// import '../../pages/signup/Signup';
import classNames from 'classnames';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export const inputSize = {
	small: 'input-sm',
	medium: 'input-md',
	large: 'input-lg',
	xl: 'input-xl',
};

const PhoneNumber = props => {
	const { label, size = 'medium', hasError = false, message = {} as { type: 'error' | 'info'; text: string }, value } = props;
	const [countryCode, setCountryCode] = useState(null);

	useEffect(() => {
		fetch('https://geolocation-db.com/json/')
			.then(res => res.json())
			.then(response => {
				setCountryCode(response.country_code);
			})
			.catch(() => {
				setCountryCode(null);
			});
	}, []);

	const handleNumber = e => {
		props.onChange(e);
	};
	return (
		<div className={classNames(`geo-phone-container geo-phone-container-${inputSize[size]} ${hasError && 'error'}`, props.inputProps && props.inputProps.disabled && 'is-disabled')}>
			{props.label && (
				<div className="text-sm leading-5 font-medium text-gray-50 mb-1">
					<label>{props.label}</label>
				</div>
			)}

			<PhoneInput defaultCountry={countryCode} {...props.inputProps} value={value} onBlur={props.onBlur} onChange={handleNumber} />
			{message && message.text && <p className={`${message.type === 'error' ? 'err-msg text-error-500' : 'info-msg text-subtle-200'}`}>{message.text}</p>}
		</div>
	);
};

export default PhoneNumber;
