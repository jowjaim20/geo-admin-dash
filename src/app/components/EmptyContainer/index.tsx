import React from 'react';
import cn from 'classnames';

type SizeTypes = 'sm' | 'lg';

interface IContainerProps {
	title: string;
	icon?: any;
	onClick?: () => void;
	size?: SizeTypes;
	dash?: boolean;
}

const EmptyContainer: React.FC<IContainerProps> = props => {
	const { size = 'sm', icon, title, onClick, dash = false } = props;

	return (
		<div
			className={cn(`relative ${dash && 'border-2 border-dashed '} border-subtle-600 rounded  ${onClick && 'cursor-pointer hover:bg-secondary-100'} ${size === 'sm' ? 'py-7' : 'py-20'}`, {})}
			onClick={onClick}
		>
			<div className="flex justify-center items-center text-subtle-300 text-base font-normal space-x-2">
				{icon && <span>{icon}</span>}
				{title && <span>{title}</span>}
			</div>
		</div>
	);
};

export default EmptyContainer;
