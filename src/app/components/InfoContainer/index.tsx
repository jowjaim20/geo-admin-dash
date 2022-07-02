import React from 'react';
import { GeoCheckedItem } from '../CheckedItem';

export const InfoContainer = props => {
	return (
		<div className="info-container">
			<div>
				<a href="https://geonode.com" className="link">
					<img src={process.env.PUBLIC_URL + '/assets/icons/logo.png'} alt="logo" className="logo" />
				</a>
				<h1>{props.info.title}</h1>
				<h2>{props.info.subtitle}</h2>
				{props.info.list.map((item, index) => {
					return <GeoCheckedItem key={index} label={item} />;
				})}
			</div>
			<ul>
				<li>
					<a href="https://geonode.com/terms-and-conditions" className="link">
						Terms
					</a>
				</li>
				<li>
					<a href="https://geonode.com/privacy-policy" className="link">
						Privacy
					</a>
				</li>
				<li>
					<a href="https://geonode.com/contact-us" className="link">
						Contact Geonode
					</a>
				</li>
			</ul>
		</div>
	);
};
