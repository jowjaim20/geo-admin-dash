import React from 'react';
import { ADButton } from '../app/components/form-controls/Button';
import { CheckIcon } from '@utils/svg-icons';

export default {
	title: 'Components/Button',
	component: ADButton,
};

const Template = args => <ADButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	label: 'Primary',
	size: 'md',
	variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
	label: 'Secondary',
	size: 'md',
	variant: 'secondary',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
	label: 'Tertiary',
	size: 'md',
	variant: 'tertiary',
	iconSettings: {
		placement: 'leading',
		dot: false,
		dotColor: '#12B76A',
		iconElement: CheckIcon,
	},
};

export const LinkColor = Template.bind({});
LinkColor.args = {
	label: 'LinkColor',
	size: 'md',
	variant: 'linkColor',
	iconSettings: {
		placement: 'leading',
		dot: true,
		dotColor: '#12B76A',
		iconElement: CheckIcon,
	},
};

export const LinkGray = Template.bind({});
LinkGray.args = {
	label: 'LinkGray',
	size: 'md',
	variant: 'linkGray',
	iconSettings: {
		placement: 'leading',
		dot: true,
		dotColor: '#12B76A',
	},
};
