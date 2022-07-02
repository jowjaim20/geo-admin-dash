import React from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import Input from '../app/components/form-controls/Input';

export default {
	title: 'Form/Control Components/Input',
	component: Input,
};

const Template = args => {
	return <Input {...args} />;
};

export const InputDefault = Template.bind({});
InputDefault.args = {
	placeholder: 'Default',
	label: 'Default',
	type: 'default',
	disabled: false,
	message: { type: 'error', text: 'Your password must be less than 4 characters.' },
};
export const InputLeadingDropdown = Template.bind({});
InputLeadingDropdown.args = {
	placeholder: 'Leading Dropdown',
	label: 'Leading Dropdown',
	type: 'leadingDropdown',
	disabled: false,
	hasError: false,
	message: { type: 'error', text: 'Your password must be less than 4 characters.' },
	dropdownOptions: [
		{
			label: 'US',
			value: 'united-states',
		},
		{
			label: 'AU',
			value: 'australia',
		},
	],
};

export const InputDefaultDisabled = Template.bind({});
InputDefaultDisabled.args = {
	placeholder: 'Default Disabled',
	label: 'Default Disabled',
	type: 'default',
	disabled: true,
};

export const InputDefaultLeadingIcon = Template.bind({});
InputDefaultLeadingIcon.args = {
	placeholder: 'Default Leading Icon',
	label: 'Default Leading Icon',
	type: 'default',
	disabled: false,
	hasError: false,
	leadingIcon: <QuestionMarkCircleIcon />,
};

export const InputDefaultTrailingIcon = Template.bind({});
InputDefaultTrailingIcon.args = {
	placeholder: 'Default Trailing Icon',
	type: 'default',
	label: 'Default Trailing Icon',
	disabled: false,
	trailingIcon: <QuestionMarkCircleIcon />,
};

export const InputDefaultInfoText = Template.bind({});
InputDefaultInfoText.args = {
	placeholder: 'Default Info Text',
	type: 'default',
	label: 'Default Info Text',
	message: { type: 'info', text: 'This is an info message.' },
	disabled: false,
};

export const InputDefaultLeadingText = Template.bind({});
InputDefaultLeadingText.args = {
	placeholder: 'Default Leading Text',
	type: 'default',
	label: 'Default Leading Text',
	message: { type: 'info', text: 'This is an info message.' },
	leadingText: 'http://',
	disabled: false,
};
