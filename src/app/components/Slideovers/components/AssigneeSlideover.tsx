import { InputWrapper, IWrapperInputProps } from '@utils/forms-utils';
import React, { useState } from 'react';
import { ISlideoverRenderComponent } from '..';
import { useForm } from 'react-hook-form';
import GeoTable from '@pages/PlanManagement/CustomTrial/AssigneeTable';
import { GeoButton } from '@components/form-controls/Button';
import { validateEmail } from '@utils/utils';

interface IAssigneeSliverProps extends ISlideoverRenderComponent {
	onSavedata: (data: any) => void;
}

const AssigneeSlideover = (props: IAssigneeSliverProps) => {
	const { onSavedata, handleClose } = props;

	const {
		register,
		// setError,
		// clearErrors,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ mode: 'onChange' });

	const [dataSource, setDataSource] = useState<any[]>([]);

	const emailInput = {
		name: 'email',
		placeholder: 'Email',
		size: 'lg',
		required: true,
		errors,
		inputProps: {
			...register('email', {
				required: 'Please enter email address',
				validate: data => {
					if (!validateEmails(data)) {
						return 'You have entered invalid email';
					}
				},
			}),
		},
	};

	const column = [
		{ title: 'Email', icon: null },
		{ title: 'Action', icon: null },
	];

	const deleteAssigneeHandler = (data: any, idx: number) => {
		let newDataSource = [...dataSource];
		newDataSource.splice(idx, 1);
		setDataSource(newDataSource);
	};

	const onSubmit = (data: any) => {
		let { email } = data;
		setDataSource((prev: any[]) => prev.concat(email.split(',').map((email: string) => ({ email: email.replace(/ /g, '') }))));
		reset();
	};

	const validateEmails = (data: string) => {
		const emails: any[] = data.split(',').map(email => email.replace(/ /g, ''));
		return emails.every(email => validateEmail(email));
	};

	const onSaveHandler = () => {
		if (dataSource.length !== 0 && handleClose) {
			onSavedata(dataSource.map(data => data.email));
			handleClose(null, null);
		}
	};

	const onCloseSlider = () => {
		if (handleClose) {
			handleClose(null, null);
		}
	};

	return (
		<div className="relative">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<InputWrapper {...(emailInput as IWrapperInputProps)} />
					<div className="text-sm font-normal text-subtle-400 leading-5 mt-1.5">
						<p>
							Use <a className="text-primary-base underline cursor-pointer">this tool</a> to enter emails in bulk with a comma separation
						</p>
					</div>
				</div>
			</form>

			<GeoTable columns={column} loading={false} dataSource={dataSource} action={deleteAssigneeHandler} />

			<div>
				<div className="flex flex-shrink-0 justify-end p-6 gap-4">
					<GeoButton label="Cancel" variant="linkGray" onClick={onCloseSlider} />
					<GeoButton label="Save" disabled={dataSource.length === 0} onClick={onSaveHandler} />
				</div>
			</div>
		</div>
	);
};

export default AssigneeSlideover;
