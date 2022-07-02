import React from 'react';
import { ADRadioButton } from '../components/RadioButton';

export default {
	title: 'Components/RadioButton',
	component: ADRadioButton,
};

const Template = args => <ADRadioButton {...args} />;

export const General = Template.bind({});
General.args = {
	options: [
		{ size: 'sm', name: 'Small', description: 'Small Option' },
		{ size: 'md', name: 'Medium', description: 'Medium Option Checked' },
		{ size: 'lg', name: 'Large', description: 'Large Option' },
		{ size: 'xl', name: 'XLarge', description: 'XLarge Option' },
		{ size: '2xl', name: '2XLarge', description: '2XLarge Option' },
	],
};

export const Detailed = Template.bind({});
Detailed.args = {
	options: [
		{ size: 'sm', name: 'Small', description: 'Small Option disabled', disabled: true },
		{ name: 'Default option, only name given' },
		{ size: 'md', name: 'Medium', description: 'Medium Option Checked', checked: true },
		{ size: 'lg', name: 'Large', description: 'Large Option' },
		{ size: 'xl', name: 'XLarge' },
	],
};

export const Empty = Template.bind({});
Empty.args = {};
