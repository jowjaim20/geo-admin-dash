import React from 'react';

type sizesTypes = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type variantsTypes = 'primary' | 'secondary' | 'tertiary' | 'linkColor' | 'linkGray';
type iconType = {
	placement?: 'leading' | 'trailing';
	dot?: boolean;
	dotColor?: string;
	iconElement?: JSX.Element;
};

type ButtonTypes = 'button' | 'submit';

interface IGeoButtonProps {
	variant?: variantsTypes;
	size?: sizesTypes;
	iconSettings?: iconType;
	iconOnly?: boolean;
	destructive?: boolean;
	label?: string;
	disabled?: boolean;
	style?: React.CSSProperties;
	onClick?: (e?: any) => void;
	containerStyle?: React.CSSProperties;
	type?: ButtonTypes;
}

const variants = {
	primary: {
		default: 'text-white btn-primary-base focus:ring-2 focus:ring-offset-2 focus:ring-customRing-primary focus:ring-offset-customRing-primary',
		destructive: 'text-white btn-primary-destructive focus:ring-2 focus:ring-offset-2 focus:ring-customRing-destructive focus:ring-offset-customRing-destructive',
	},
	secondary: {
		default: 'btn-secondary-base bg-white focus:ring-2 focus:ring-offset-2 focus:ring-customRing-secondary focus:ring-offset-customRing-secondary',
		destructive: 'btn-secondary-destructive focus:ring-2 focus:ring-offset-2 focus:ring-customRing-destructive focus:ring-offset-customRing-destructive',
	},
	tertiary: {
		default: 'btn-tertiary bg-white',
		destructive: 'btn-tertiary bg-white',
	},
	linkColor: {
		default: 'btn-link-color bg-white border-gray-300',
		destructive: 'btn-link-destructive bg-white',
	},
	linkGray: {
		default: 'btn-link-gray bg-white border border-gray-300',
		destructive: 'btn-link-destructive bg-white',
	},
};

const btnSize = {
	sm: 'btn-sm text-sm py-2 px-3.5',
	md: 'btn-md text-sm py-2.5 px-4',
	lg: 'btn-lg text-base py-2.5 px-4.5',
	xl: 'btn-xl text-base py-3 px-5',
	'2xl': 'btn-2xl text-lg py-4 px-7',
};

export const GeoButton: React.FC<IGeoButtonProps> = props => {
	const { size = 'md', type = 'button', variant = 'primary', onClick, style, label, disabled = false, destructive = false, iconSettings, iconOnly = false } = props;

	const sizeClass = btnSize[size];
	const variantClass = destructive
		? iconOnly
			? variants[variant].destructive + ' square'
			: variants[variant].destructive
		: iconOnly
		? variants[variant].default + ' square'
		: variants[variant].default;
	const disabledClass = disabled ? `${variantClass} cursor-not-allowed disabled` : `${variantClass}`;
	const generalButtonClass = 'justify-center flex items-center w-full rounded-lg shadow-sm';

	return (
		<div className={'adbutton-container'} style={props.containerStyle}>
			<button type={type} className={`${generalButtonClass} ${sizeClass} ${disabledClass}`} onClick={onClick} style={style}>
				{iconSettings?.placement === 'leading' && !iconOnly ? (
					!!iconSettings?.dot ? ( // backgroundColor given in style because of dynamic structure
						<span className="mr-2 w-2 h-2 rounded-full" style={{ backgroundColor: iconSettings?.dotColor || 'white' }}></span>
					) : (
						<span className="mr-2">{iconSettings?.iconElement}</span>
					)
				) : (
					''
				)}
				<span>{iconOnly ? iconSettings?.iconElement : label}</span>
				{iconSettings?.placement === 'trailing' && !iconOnly ? (
					!!iconSettings?.dot ? (
						<span className="ml-2 w-2 h-2 rounded-full" style={{ backgroundColor: iconSettings?.dotColor || 'white' }}></span>
					) : (
						<span className="ml-2">{iconSettings?.iconElement}</span>
					)
				) : (
					''
				)}
			</button>
		</div>
	);
};
