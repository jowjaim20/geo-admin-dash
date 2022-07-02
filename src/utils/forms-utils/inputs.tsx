export const createEmailInput = (args = {}) => ({
	label: 'Email',
	key: 'email',
	options: {
		validate: value => {
			if (value.length === 0) {
				return 'Email is required';
			} else if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) === false) {
				return 'Email is not valid';
			}
		},
	},
	...args,
});

export const createNameInput = (options, args = {}) => ({
	label: options.label,
	placeholder: options.placeholder,
	key: options.key,
	options: {
		validate: value => {
			if (value.length === 0) {
				return 'First name is required';
			} else if (/^[A-Za-z]+$/i.test(value) === false) {
				return 'Only letters';
			}
		},
	},
	...args,
});
