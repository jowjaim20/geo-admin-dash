import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import { InputWrapper, IWrapperInputProps } from '@utils/forms-utils';
import { GeoButton } from '@components/form-controls/Button';

export default function AuthModal(props) {
	const { show = true, onSubmit, onDismiss } = props;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({});
	const onSubmitHandler = (data: any) => {
		onSubmit(data);
	};

	const inputs = {
		username: {
			name: 'username',
			label: 'Username',
			placeholder: 'Username',
			size: 'lg',
			required: true,
			errors,
			inputProps: { ...register('username', { required: 'Username is required' }) },
		},
		password: {
			name: 'password',
			label: 'Password',
			placeholder: 'Password',
			size: 'lg',
			required: true,
			errors,
			type: 'password',
			inputProps: { ...register('password', { required: 'Password is required' }) },
		},
	};

	return (
		<Transition.Root show={show} as={Fragment}>
			<Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => onDismiss()}>
				<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
						<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
							<div>
								<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
									<CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
								</div>
								<div className="mt-3 text-center sm:mt-5">
									<Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
										Authentication
									</Dialog.Title>
									<div className="mt-2">{/* <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.</p> */}</div>
								</div>
							</div>
							<div className="mt-5 sm:mt-6">
								<form className="grid gap-6" onSubmit={handleSubmit(onSubmitHandler)}>
									<div>
										<InputWrapper {...(inputs.username as IWrapperInputProps)} />
									</div>
									<div>
										<InputWrapper {...(inputs.password as IWrapperInputProps)} />
									</div>

									<div className="flex justify-end gap-2">
										<GeoButton label="Cancel" destructive variant="secondary" onClick={() => onDismiss()} />
										<GeoButton label="Submit" type="submit" />
									</div>
								</form>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
