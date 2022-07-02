import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { GeoButton } from '@components/form-controls/Button';
import { slideoverService } from '@services/index';

type SlideoverVariant = 'primary';

export interface ISlideover {
	onSlideoverClose?: (result: any, event) => any;
	content?: any;
	variant?: SlideoverVariant;
	// @ts-ignore
	render?: ({}: ISlideoverRenderComponent) => React.FC<any, any>;
	title?: string;
	subtitle?: string;
	hasAction?: boolean;
	cancelText?: string;
	okText?: string;
	containerStyle?: React.CSSProperties;
	onSaveHandler?: () => void;
}

export interface ISlideoverRenderComponent {
	handleClose?: (result: any, event: any) => any;
	currSlideover?;
}

const GlobalSlideover = props => {
	// const { open, onCloseSlideover } = props;

	const [open, setOpen] = useState(false);
	const [currSlideover, setCurrSlideover] = useState({} as ISlideover);

	const openSlideover = () => {
		setOpen(true);
	};

	useEffect(() => {
		const sub$ = slideoverService.slideover$.subscribe(slideover => {
			if (slideover) {
				setCurrSlideover(slideover);
				setTimeout(() => {
					openSlideover();
				});
			}
		});

		return () => {
			if (sub$) sub$.unsubscribe();
		};
	}, []);

	const handleClose = (result, event) => {
		if (currSlideover.onSlideoverClose) currSlideover.onSlideoverClose(result, event);
		setOpen(false);
	};

	return (
		<div className="geoslideover-wrapper">
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={() => handleClose(null, null)}>
					<div className="absolute inset-0 overflow-hidden">
						<Transition.Child as={Fragment} enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
							<Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
						</Transition.Child>

						<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<div className="pointer-events-auto w-screen max-w-md">
									<div className="flex h-full flex-col overflow-y-scroll bg-white pb-6 shadow-xl">
										{currSlideover.title && (
											<div className="bg-gray-50 py-6 px-4 sm:px-6">
												<div className="flex items-start justify-between">
													<Dialog.Title className="text-lg font-medium text-secondary-200">{currSlideover.title}</Dialog.Title>
												</div>
											</div>
										)}

										<div className="relative mt-6 flex-1 px-4 sm:px-6">{currSlideover && <SlideoverComponent {...{ currSlideover, handleClose }} />}</div>

										{currSlideover.hasAction && (
											<div className="flex flex-shrink-0 justify-end p-6 gap-4">
												<GeoButton label={currSlideover.cancelText || 'Cancel'} variant="linkGray" onClick={() => handleClose(null, null)} />
												<GeoButton label={currSlideover.okText || 'Save'} onClick={currSlideover.onSaveHandler} />
											</div>
										)}
									</div>
								</div>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</div>
	);
};

const SlideoverComponent = (props: ISlideoverRenderComponent) => {
	const { currSlideover, handleClose } = props;

	return <>{currSlideover.render({ handleClose, currSlideover })}</>;
};

export default GlobalSlideover;
