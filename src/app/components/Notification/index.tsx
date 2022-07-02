/* This example requires Tailwind CSS v2.0+ */
import React from 'react';
import { Fragment, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { useLocation } from 'react-router-dom';
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationIcon, XIcon } from '@heroicons/react/solid';
import { notificationService } from '@services/index';

type Variants = 'default' | 'warning' | 'error' | 'success' | 'info';

export interface INotification {
	title?: string;
	body?: any;
	variant?: Variants;
	action?: any;
	html?: any;
	// @ts-ignore
	render?: ({}: INotificationComponent) => React.FC<any, any>;
	isCustom?: boolean;
	autoDismiss?: number;
	closeNotification?: boolean;
}

interface GeoNotificationProps {
	title?: string;
	body?: any;
	variant?: Variants;
	action?: any;
}

export interface INotificationComponent {
	notificationRef?;
	handleClose?: (result: any, event: any) => any;
	notification?;
}

const getIcon = type => {
	if (type === 'error') {
		return <ExclamationIcon className="h-6 w-6" aria-hidden="true" style={{ color: '#D72C0D' }} />;
	} else if (type === 'warning') {
		return <ExclamationCircleIcon className="h-6 w-6 text-gray-400" aria-hidden="true" style={{ color: '#B98900' }} />;
	} else if (type === 'success') {
		return <CheckCircleIcon className="h-6 w-6 text-gray-400" aria-hidden="true" style={{ color: '#007F5F' }} />;
	} else if (type === 'info') {
		return <ExclamationCircleIcon className="h-6 w-6 text-gray-400" aria-hidden="true" style={{ color: '#00A0AC' }} />;
	} else {
		return <ExclamationCircleIcon className="h-6 w-6 text-gray-400" aria-hidden="true" style={{ color: '#5C5F62' }} />;
	}
};

const backgroundColor = {
	error: '#FFF4F4',
	success: '#F1F8F5',
	warning: 'rgba(251, 163, 60, 0.2)',
	info: '#EBF9FC',
	default: '#F6F6F7',
};

const GeoNotification: React.FC<GeoNotificationProps> = props => {
	const [open, setOpen] = useState(false);
	const [notification, setNotification] = useState({} as INotification);
	const [timer, setTimer] = useState(0);

	useEffect(() => {
		const sub = notificationService.floatingNotifications$.subscribe(n => {
			// !open &&
			if (n && (n.title || n.body || n.closeNotification)) {
				openNotification(n);
			}
		});

		return () => {
			if (sub) sub.unsubscribe();
		};
	}, []);

	useEffect(() => {
		let t = 0;
		if (open) {
			t = setTimeout(() => {
				setOpen(false);
			}, timer * 1000);
		}

		return () => clearTimeout(t);
	}, [open]);

	const openNotification = (n: INotification) => {
		if (!n) return;
		setNotification({ ...n });
		n.autoDismiss ? setTimer(n.autoDismiss) : setTimer(7);
		n.closeNotification ? setOpen(false) : setOpen(true);
	};

	const handleClose = (event, reason) => {
		setOpen(false);
	};

	const { variant, title, body, html, action } = notification;
	return (
		<>
			{/* Global notification live region, render this permanently at the end of the document */}
			<div aria-live="assertive" className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start" style={{ zIndex: 9999 }}>
				<Content {...{ variant, handleClose, title, html, body, action, open }} />
			</div>
		</>
	);
};

const GeoStaticNotification: React.FC<GeoNotificationProps> = props => {
	const [open, setOpen] = useState(false);
	const [notification, setNotification] = useState({} as INotification);
	const location = useLocation();

	useEffect(() => {
		const sub = notificationService.staticMainNotifications$.subscribe(n => {
			if (!open && n && (n.title || n.body || n.closeNotification)) {
				openNotification(n);
			}
		});

		return () => {
			if (sub) sub.unsubscribe();
		};
	}, []);

	useEffect(() => {
		// notificationService.staticMainNotifications$.unsubscribe();
		setNotification({});
		setOpen(false);
	}, [location]);

	const openNotification = (n: INotification) => {
		if (!n) return;
		setNotification({ ...n });
		n.closeNotification ? setOpen(false) : setOpen(true);
	};

	const handleClose = (event, reason) => {
		setOpen(false);
	};

	const { variant, title, body, html, action } = notification;

	const renderNotification = () => {
		if (Object.keys(notification).length === 0) {
			return null;
		}

		return notification.isCustom ? <CustomNotification {...{ notification, handleClose, open }} /> : <Content {...{ variant, handleClose, title, html, body, action, open }} isStatic={true} />;
	};

	return (
		<>
			{/* Global notification live region, render this permanently at the end of the document */}
			<div aria-live="assertive" className="bg-background-background inset-0 flex items-end pointer-events-none sm:items-start">
				{renderNotification()}
			</div>
		</>
	);
};

export { GeoNotification, GeoStaticNotification };

const CustomNotification = props => {
	const { notification, handleClose, open } = props;
	const notificationRef = React.createRef<any>();

	return (
		<div className="global-notification w-full mb-6 flex flex-col items-center space-y-4 sm:items-end">
			<Transition
				show={open}
				as={Fragment}
				enter="transform ease-out duration-300 transition"
				enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
				enterTo="translate-y-0 opacity-100 sm:translate-x-0"
				leave="transition ease-in duration-100"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div ref={notificationRef} className="w-full relative pointer-events-auto">
					{notification.render({ notification, handleClose, notificationRef })}
					<div className="close-icon absolute" onClick={e => handleClose(e, null)}>
						<XIcon
							className="h-5 w-5"
							aria-hidden="true"
							style={{
								backgroundColor: 'transparent',
							}}
						/>
					</div>
				</div>
			</Transition>
		</div>
	);
};

const Content = props => {
	const { open, variant, title, body, html, action, handleClose, isStatic = false } = props;
	function createHtmlMarkup(html) {
		return { __html: html };
	}
	return (
		<div className="global-notification w-full mb-6 flex flex-col items-center space-y-4 sm:items-end">
			<Transition
				show={open}
				as={Fragment}
				enter="transform ease-out duration-300 transition"
				enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
				enterTo="translate-y-0 opacity-100 sm:translate-x-0"
				leave="transition ease-in duration-100"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className={`${!isStatic ? 'max-w-sm' : ''} w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden message`}>
					<div
						className="p-4"
						style={{
							// @ts-ignore
							backgroundColor: backgroundColor[variant] || backgroundColor.default,
						}}
					>
						<div className="flex items-start">
							<div className="flex-shrink-0">{getIcon(variant)}</div>
							<div className="ml-3 w-0 flex-1 pt-0.5">
								{title && <p className="text-sm font-medium text-gray-500">{title}</p>}
								{body && <p>{body}</p>}
								{html && <div dangerouslySetInnerHTML={createHtmlMarkup(html)}></div>}
								{action && <div>{action}</div>}
							</div>
							<div className="ml-4 flex-shrink-0 flex">
								<CloseIcon {...{ variant, handleClose }} />
							</div>
						</div>
					</div>
				</div>
			</Transition>
		</div>
	);
};

const CloseIcon = ({ handleClose, variant }) => (
	<button className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={e => handleClose(e, null)}>
		<span className="sr-only">Close</span>
		<XIcon
			className="h-5 w-5"
			aria-hidden="true"
			style={{
				backgroundColor: backgroundColor[variant],
			}}
		/>
	</button>
);
