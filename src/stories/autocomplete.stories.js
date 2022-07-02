import React from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import AutoComplete from '../components/AutoComplete';

export default {
	title: 'Form/Control Components/AutoComplete',
	component: AutoComplete,
};

const Template = args => {
	return <AutoComplete {...args} />;
};

export const AutoCompleteDefault = Template.bind({});
AutoCompleteDefault.args = {
	label: 'Default AutoComplete',
};
