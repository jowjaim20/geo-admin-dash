import React from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import TextArea from '../components/TextArea';

export default {
	title: 'Form/Control Components/TextArea',
	component: TextArea,
};

const Template = args => {
	return <TextArea {...args} />;
};

export const TextAreaDefault = Template.bind({});
TextAreaDefault.args = {
	label: 'Default Text Area',
};
