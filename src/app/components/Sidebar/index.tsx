import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { LogOutOutlineDIcon, ChevronUp, ToolsRightIcon } from '@utils/svg-icons';

type NavigationItemType = {
	path: string;
	href?: string;
	label: string;
	key?: string;
	exact: boolean;
	icon: any;
	activeIcon?: any;
	component: any;
	onClick?: any;
	isTools?: boolean;
	isStatus?: boolean;
	target?: any;
};

type NavigationGroupType = {
	title: string;
	icon: any;
	children: NavigationItemType[];
	isActive?: string;
	setIsActive: () => void;
	path?: any;
	target: any;
};

interface ISidebarProps {
	routes: Array<NavigationGroupType>;
	logo: JSX.Element;
	toggleDrawer?: (val1: 'left', val2: boolean) => void;
}

// const BorderLinearProgress = withStyles(theme => ({
// 	root: {
// 		height: 8,
// 		borderRadius: 4,
// 		background: '#191d30',
// 	},
// 	bar: {
// 		borderRadius: 4,
// 		backgroundColor: '#42cb99',
// 	},
// }))(LinearProgress);

const GeoSidebar: React.FC<ISidebarProps> = props => {
	const { routes, logo, toggleDrawer } = props;
	const [isActive, setIsActive] = useState(routes[0].title);
	const { pathname } = useLocation();

	React.useEffect(() => {
		if (pathname !== '/') {
			for (let x = 0; x < routes.length; x++) {
				if (routes[x].children?.length !== 0) {
					for (let y = 0; y < routes[x].children?.length; y++) {
						if (pathname === routes[x].children[y]?.path) {
							setIsActive(routes[x].title);
						}
					}
				}
			}
		}
	}, [pathname, routes]);

	return (
		<nav className="geo-navigation bg-secondary-200 pt-8 sticky md:sticky top-0 z-10 h-full">
			<div className="geo-navigation__drawer navigation__docked h-full">
				<div className="navigation__drawer navigation__drawer-left h-full flex flex-col">
					<div className="navigation__drawer-logo text-white mb-6 px-6 ">
						<Link to="/">{logo}</Link>
					</div>

					<div className="flex-1 flex flex-col justify-between">
						<PerfectScrollbar className="navigation__drawer-scroll">
							<div>
								{routes.map(route => {
									return (
										<div key={route.title}>
											<NavigationGroup toggleDrawer={toggleDrawer} route={route} isActive={isActive} setIsActive={setIsActive} />
										</div>
									);
								})}
							</div>
						</PerfectScrollbar>

						<div className="relative">
							{/* {isNotifyVisible && (
								<div
									className="absolute text-white p-4 pt-5 rounded-lg mx-4 mb-4 z-50 bg-secondary-50 shadow-lg"
									style={{
										top: '-170%',
									}}
								>
									<div className="flex justify-between">
										<p className="font-medium text-sm leading-5 mb-1">Used Gigabytes</p>
										<div className="cursor-pointer" onClick={() => setNotifyVisible(false)}>
											{CloseIcon(20)}
										</div>
									</div>

									<div className="text-sm font-normal leading-5">Your service has used 80% of your available gigabytes. Need more?</div>

									<div className="my-4">
										<BorderLinearProgress variant="determinate" value={80} className={80 <= 0 ? 'geo-progress-bar' : ''} />
									</div>

									<div className="text-sm">
										<span className="cursor-pointer" onClick={() => setNotifyVisible(!isNotifyVisible)}>
											Dismiss
										</span>
										<span className="text-support-2-base ml-2">Upgrade plan</span>
									</div>
								</div>
							)} */}

							{/* <div className="flex justify-between pb-8 pt-6 px-4 mx-4 text-white border-t border-gray-border">
								<div>
									<div>Joanna Azzi </div>
									<div>joana@mail.com</div>
								</div>
								<div className="cursor-pointer">{LogOutOutlineDIcon}</div>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

const NavigationGroup = (props: { route: NavigationGroupType; toggleDrawer?: any; isActive?: string; setIsActive: (a: string) => void }) => {
	const { route, isActive, setIsActive, toggleDrawer } = props;
	const { pathname } = useLocation();

	const [isOpen, setIsOpen] = useState(route.title === isActive ? true : false);
	const isMatchWithActiveTitle = isActive === route.title;

	const onNavigationItemClick = item => {
		if (isMatchWithActiveTitle) {
			setIsActive('');
		} else {
			setIsActive(route.title);
		}

		setIsOpen(!isOpen);
	};

	const renderNavigationItem = (item: NavigationItemType) => {
		return (
			<div key={item.label} className="" onClick={toggleDrawer ? toggleDrawer('left', false) : null}>
				<NavigationItem item={item} />
			</div>
		);
	};

	return (
		<ul className="navigation__list mt-1">
			<div className="navigation__cat text-support-1-base px-4 text-base font-medium leading-6 cursor-pointer">
				{route?.children?.length === 0 ? (
					<NavLink to={route?.path || '/'} target={route?.target} exact onClick={onNavigationItemClick}>
						<div className={`nagivation__title py-2 px-3 flex items-center rounded`} onClick={toggleDrawer ? toggleDrawer('left', false) : null}>
							<span className=" mr-auto">{route.title}</span>
							{route.icon && (
								<span className="navigation__item-icon text-primary-300" style={{ marginRight: 2 }}>
									{route.icon}
								</span>
							)}
						</div>
					</NavLink>
				) : (
					<div className={`nagivation__title py-2 px-3 flex items-center justify-between rounded`} onClick={onNavigationItemClick}>
						<div className="flex items-center">
							{route.icon && (
								<span className="navigation__item-icon text-primary-300 m" style={{ marginRight: 15 }}>
									{route.icon}
								</span>
							)}
							<span>{route.title}</span>
						</div>

						<span className={`navigation_group-carret ${isMatchWithActiveTitle ? `navigation_group-carretClose` : `navigation_group-carretOpen`}`}>{ChevronUp}</span>
					</div>
				)}
			</div>

			{route?.children?.length !== 0 && isMatchWithActiveTitle && (
				<ul className={`px-4 navigation__list-cont py-2 ${isMatchWithActiveTitle ? 'navigation__list-active' : 'navigation__list-inactive'}`}>{route.children.map(renderNavigationItem)}</ul>
			)}
		</ul>
	);
};

const NavigationItem = (props: { item: NavigationItemType }) => {
	const { item } = props;
	const { pathname } = useLocation();

	return (
		<li className="navigation__child" key={item.label}>
			<NavLink
				to={item.path}
				className="navigation__item text-support-1-base text-base font-medium rounded py-2 hover:bg-secondary-100 mb-0.5"
				target={item.target}
				// ref={buttonRef}
				// onClick={onClickButton}
				activeClassName={'item-active bg-secondary-100 text-support-2-base'}
				key={item.key}
				exact
			>
				<div className="flex-1 flex items-center justify-center">
					<div>
						<span className="navigation__item-icon text-primary-300 mr-2">{pathname === item.path ? item.activeIcon || item.icon : item.icon}</span>
						<span className={`navigation__item-label ${item?.key || item?.isTools ? 'w-40 whitespace-nowrap overflow-hidden overflow-ellipsis' : ''}`}>
							<span className="text-base leading-6 font-medium">{item.label}</span>
							<span className="fade"></span>
						</span>
					</div>

					<div className="flex-1 flex justify-end">{item?.isTools && <span>{ToolsRightIcon(null)}</span>}</div>
				</div>
			</NavLink>
		</li>
	);
};

export default GeoSidebar;
