import React, { useState } from 'react';
import { CheckIcon, SelectorIcon, SearchIcon } from '@heroicons/react/solid';
import { Combobox } from '@headlessui/react';

interface IAutoCompleteProps {
	label?: string;
	icon?: any;
}

const data = [
	{ name: 'Leslie Alexander', username: '@lesliealexander' },
	{ name: 'Kathleen White', username: '@kathleenwhite' }, // Test Data for Storybook
	{ name: 'Sandra Adams', username: '@sandraadams' },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const AutoComplete: React.FC<IAutoCompleteProps> = ({ label, icon = <SearchIcon /> }) => {
	const [query, setQuery] = useState('');
	const [selected, setSelected] = useState();

	const filtered =
		query === ''
			? data
			: data.filter(item => {
					return item.name.toLowerCase().includes(query.toLowerCase());
			  });

	return (
		<Combobox as="div" value={selected} onChange={setSelected}>
			{label && <Combobox.Label className="block text-sm font-medium text-gray-700">{label}</Combobox.Label>}
			<div className="relative mt-1">
				{icon && (
					<div className="absolute inset-y-0 left-0 flex items-center rounded-r-md pl-2 focus:outline-none">
						{React.cloneElement(icon, { className: 'h-5 w-5 text-gray-400', 'aria-hidden': true })}
					</div>
				)}
				<Combobox.Input
					className="w-full rounded-md border border-gray-300 bg-white py-2 pl-8 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
					onChange={event => setQuery(event.target.value)}
					displayValue={(item: { name: string; username: string }) => item.name}
				/>
				<Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
					<SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
				</Combobox.Button>

				{filtered.length > 0 && (
					<Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{filtered.map(item => (
							<Combobox.Option
								key={item.username}
								value={item}
								className={({ active }) => classNames('relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900')}
							>
								{({ active, selected }) => (
									<>
										<div className="flex">
											<span className={classNames('truncate', selected && 'font-semibold')}>{item.name}</span>
											<span className={classNames('ml-2 truncate text-gray-500', active ? 'text-indigo-200' : 'text-gray-500')}>{item.username}</span>
										</div>

										{selected && (
											<span className={classNames('absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600')}>
												<CheckIcon className="h-5 w-5" aria-hidden="true" />
											</span>
										)}
									</>
								)}
							</Combobox.Option>
						))}
					</Combobox.Options>
				)}
			</div>
		</Combobox>
	);
};

export default AutoComplete;
