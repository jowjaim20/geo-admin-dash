import React from 'react';

interface Props {
	label: string;
	size?: sizesTypes;
	onClick?: () => void;
	rightChildClick?: () => void;
	disabled?: boolean;
	choice?: boolean;
	selected?: boolean;
	removable?: boolean;
	leftChild?: any;
	rightChild?: any;
	color?: string;
	chipStyle?: any;
	id?: any;
	key?: any;
	style?: React.CSSProperties;
	className?: any;
	variant?: variantTypes;
}

type variantTypes = 'primary' | 'secondary' | 'error' | 'supportGreen' | 'subtle' | 'green' | 'darkGray' | 'lighBlue' | 'neonCarrot';
type sizesTypes = 'sm' | 'md' | 'lg' | 'xl';

const badgeSize = {
	sm: 'text-xs px-2.5 py-0.5 font-medium',
	md: 'text-sm px-2.5 py-0.5 font-medium',
	lg: 'text-xs px-2.5 py-1.5 font-normal',
	xl: 'text-lg px-2.5 py-1.75 font-normal',
};

const variants = {
	primary: 'bg-support-2-100 text-white',
	secondary: 'bg-subtle-600 text-support-1-base',
	supportGreen: 'bg-green-900 text-support-1-base',
	error: 'bg-red-900 text-support-1-base',
	subtle: 'bg-subtle-500 text-support-1-base',
	green: 'bg-support-2-200 text-support-1-base',
	darkGray: 'bg-support-4-100 text-support-1-base',
	lighBlue: 'bg-support-4-base text-support-1-base',
	neonCarrot: 'bg-supportNeonCarrot-100 text-support-1-base',
};
const ChipComponent = (props: Props) => {
	const { label, size = 'md', variant = 'primary', leftChild, rightChild, id, key, style, onClick } = props;

	const sizeClass = badgeSize[size];
	const variantClass = variants[variant];

	return (
		<div className="flex items-center" key={id || key}>
			<span className={`inline-flex justify-center items-center rounded-full ${sizeClass} ${variantClass} ${onClick && 'cursor-pointer'}`} style={style} onClick={onClick}>
				{leftChild}
				{label}
				{rightChild}
			</span>
		</div>
	);
};

export default ChipComponent;
