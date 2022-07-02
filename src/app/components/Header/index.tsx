import { GeoButton } from '@components/form-controls/Button';
import React from 'react';

interface IHeaderProps {
	title: string;
	actionHandler?: () => void;
	actionLabel?: string;
	actionIcon?: any;
	cancelHandler?: () => void;
}

const Header = (props: IHeaderProps) => {
	const { title, actionHandler, actionLabel, actionIcon, cancelHandler } = props;
	const icon: any = actionIcon ? { iconElement: <span>{actionIcon}</span>, placement: 'leading' } : null;
	return (
		<div className="flex justify-between pb-3 pt-8 px-8 border-b bottom-1 border-gray-200">
			<div className="text-gray-900 text-2xl font-semibold">
				<h2>{title}</h2>
			</div>

			<div className="flex gap-3">
				{cancelHandler && <GeoButton label="Cancel" onClick={cancelHandler} variant="secondary" destructive />}
				{actionHandler && <GeoButton label={actionLabel} onClick={actionHandler} iconSettings={icon} />}
			</div>
		</div>
	);
};

export default Header;
