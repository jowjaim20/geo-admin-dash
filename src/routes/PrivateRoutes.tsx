import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GeoSidebar from '@components/Sidebar';
import routes from './routes';
import { GeoLogo } from '@utils/svg-icons';

const PrivateRoutes = props => {
	const filteredRoutes = routes.filter(route => route.target !== '_blank');
	return (
		<>
			<div className="flex flex-col h-full">
				<div className="flex-1 flex">
					<div className="layout-wrapper">
						<GeoSidebar routes={routes} logo={GeoLogo} />
					</div>

					<main className="flex-1 geo-content bg-white text-gray-500 pr-0 flex flex-col h-full">
						<div className="relative flex-1 ">
							<div className="relative">
								<Switch>
									{filteredRoutes.map(route => {
										if (route.children.length !== 0) {
											return route.children.map(item => {
												return <Route {...item} />;
											});
										} else {
											return <Route {...route} />;
										}
									})}

									<Redirect from="*" exact to="/" />
								</Switch>
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	);
};

export default PrivateRoutes;
