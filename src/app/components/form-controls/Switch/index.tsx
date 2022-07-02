import React from 'react';
type placementTypes = 'start' | 'end' | 'top' | 'bottom';
interface IGeoSwitch {
	label?: any;
	labelPlacement?: placementTypes;
	switchProps?: any;
	containerStyle?: React.CSSProperties;
}

export const GeoSwitch: React.FC<IGeoSwitch> = props => {
	// value={name} onChange={handleChange}
	return (
		<div className={'geo-switch'} style={props.containerStyle}>
			Switch
		</div>
	);
};
