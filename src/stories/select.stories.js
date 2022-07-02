import React from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import Select from '../components/Select';

export default {
	title: 'Form/Control Components/Select',
	component: Select,
};

const Template = args => {
	return <Select {...args} />;
};

export const SelectDefault = Template.bind({});
SelectDefault.args = {
	label: 'Default Select',
};
