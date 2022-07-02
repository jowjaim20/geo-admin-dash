import React from 'react';
import CheckedImg from './check.svg';

export const GeoCheckedItem = props => {
	return (
		<div className={'geo-checked-item'} style={props.containerStyle}>
			<img src={CheckedImg} alt="" />
			<label>{props.label}</label>
		</div>
	);
};
