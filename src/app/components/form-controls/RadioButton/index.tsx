import React from 'react';

type Sizes = 'sm' | 'md' | 'lg' | 'xl';

interface IGeoRadioButtonProps {
	label?: string;
	size?: Sizes;
	name?: string;
	value?: any;
	className?: string;
	style?: React.CSSProperties;
	radioProps?: any;
	checked?: boolean;
	onChange?: (e) => void;
	disabled?: boolean;
}

const classNameGenerator = (size, className, disabled) => {
	const wrapperClass = 'radio-wrapper';
	const inputClass = `form-radio ${className} ${size} ${disabled && 'cursor-not-allowed'}`;
	const labelClass = `radio-label ml-2 ${size}`;

	return { wrapperClass, inputClass, labelClass };
};

export const GeoRadioButton = (props: IGeoRadioButtonProps) => {
	const { label, size = 'md', name, value, className = '', style, checked, onChange, radioProps, disabled = false } = props;
	const { wrapperClass, inputClass, labelClass } = classNameGenerator(size, className, disabled);

	return (
		<div className={wrapperClass}>
			<label className="inline-flex items-center">
				<input disabled={disabled} type="radio" className={inputClass} name={name} value={value} checked={checked} onChange={onChange} style={style} {...radioProps} />
				{label && <span className={labelClass}>{label}</span>}
			</label>
		</div>
	);
};
