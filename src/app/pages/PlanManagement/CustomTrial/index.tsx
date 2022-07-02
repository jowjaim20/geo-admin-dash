import React, { useState } from 'react';
import CreateUpdateTrial from './CreateUpdateTrial';
import TrialManagement from './TrialManagement';
import { adminServiceApiService, customPlanApiService } from '@services/index';
import reactModal from '@prezly/react-promise-modal';
import AuthModal from './AuthModal';

const CustomTrialPage = () => {
	const [stage, setStage] = useState(1);

	const onSaveHandler = async (values: any) => {
		try {
			const auth = await reactModal(({ show, onSubmit, onDismiss }) => <AuthModal show={show} onSubmit={onSubmit} onDismiss={onDismiss} />);
			const payload = {
				...values,
			};

			const res = await customPlanApiService.post(
				'/admin/custom-plan',
				{ ...payload },
				{
					auth: { ...auth },
				},
			);

			if (res.data.data.errorAssignees.length !== 0) {
				alert('Success on creating custom plan! Warning some email is not existing!');
			} else {
				alert('Success on creating custom plan!');
			}
			await adminServiceApiService.post('/admin/reset-server-plans', '', { auth: { ...auth } });
			setStage(1);
		} catch (err: any) {
			if (err.message) {
				alert(err?.message);
				return;
			}
			alert(err?.err);
		}
	};

	return (
		<div className="relative">
			<div>{stage === 1 ? <TrialManagement createNewTrial={() => setStage(2)} /> : <CreateUpdateTrial cancel={() => setStage(1)} saveData={onSaveHandler} />}</div>
		</div>
	);
};

export default CustomTrialPage;
