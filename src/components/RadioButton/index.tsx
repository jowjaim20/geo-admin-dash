import React from 'react';

type sizesTypes = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type optionType = {
	size?: sizesTypes;
	name: string;
	description?: string;
	checked?: boolean;
	disabled?: boolean;
};

interface IADRadioButtonProps {
	options: optionType[];
	style?: React.CSSProperties;
	containerStyle?: React.CSSProperties;
}

const dotClasses = {
	sm: 'w-1 h-1',
	md: 'w-2 h-2',
	lg: 'w-3 h-3',
	xl: 'w-4 h-4',
	'2xl': 'w-5 h-5',
};

const borderClasses = {
	sm: 'w-4 h-4',
	md: 'w-5 h-5',
	lg: 'w-6 h-6',
	xl: 'w-7 h-7',
	'2xl': 'w-8 h-8',
};

export const ADRadioButton: React.FC<IADRadioButtonProps> = props => {
	const { options, style, containerStyle } = props;
	const defaultClass = 'md';

	const sizeToHeight = {
		sm: 4,
		md: 5,
		lg: 6,
		xl: 7,
		'2xl': 8,
	};

	return (
		<fieldset>
			<div className="space-y-5">
				{options &&
					options.map((option, index) => (
						<div key={option.size} className="flex flex-col items-start" style={containerStyle}>
							<div className="flex flex-wrap items-center mb-4">
								<input
									id={`${(option.size || defaultClass) && index}`}
									aria-describedby={`${option.size}-description`}
									name="plan"
									type="radio"
									defaultChecked={option.checked === true}
									disabled={option.disabled === true}
									className="hidden"
									style={style}
								/>
								<label htmlFor={`${(option.size || defaultClass) && index}`} className={`flex flex-col items-start text-gray-700 cursor-pointer text-${option.size || defaultClass}`}>
									<div className={`flex flex-row justify-center items-center`}>
										<span className={`flex justify-center items-center mr-3 rounded-full border-solid border border-grey ${borderClasses[option.size || defaultClass]}`}>
											<span className={`inline-block rounded-full + dot-class ${dotClasses[option.size || defaultClass]}`}></span>
										</span>
										{option.name || 'No label given!'}
									</div>

									<span id={`${(option.size || defaultClass) && index}-description`} className={`text-gray-500 ml-${3 + sizeToHeight[option.size || defaultClass]}`}>
										{option.description}
									</span>
								</label>
							</div>
						</div>
					))}
			</div>
		</fieldset>
	);
};
