import Header from '@components/Header';
import { PlusIcon } from '@utils/svg-icons';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SearchIcon, ArrowRightIcon, ArrowLeftIcon, ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';
import ReactPaginate from 'react-paginate';
import { customTrial, customPlanApiService } from '@services/index';
import debounce from 'lodash/debounce';
import { Loader } from "../../ProxyReports/index"
import './style.scss';
import { Select } from '../../ProxyReports/Select';

interface ITrialManagementProps {
	createNewTrial: () => void;
}

const tableHeading = [
	{ name: 'Path ID', value: 'pathID' },
	{ name: 'Service Type', value: 'serviceType' },
	{ name: 'Units', value: 'units' },
	{ name: 'Price', value: 'price' },
	{ name: 'Assigned to', value: 'assignee' },
	{ name: 'From to', value: 'fromTo' },
	{ name: 'Created', value: 'created' },
	{ name: 'Agent', value: 'agent' },
	{ name: 'Status', value: 'status' },
	{ name: '', value: '' },
];

interface AppliedFilters {
	value: string;
	label: string;
	checked: boolean;
}

interface TableData {
	assignees: string[]
	id: string
	name: string
	notes: any
	price: number
	serviceType: string
	units: number,
	status: string,
	agent: string,
	from: string,
	to: string,
	created: string,
	agentImage: string
}

const filtersStructure = [
	{
		id: '1',
		queryName: 'serviceType',
		name: 'Service type',
		options: [
			{
				id: '101',
				label: 'Residential Premium',
				value: 'RESIDENTIAL-PREMIUM',
				checked: true,
			},
			{
				id: '102',
				label: 'Residential Private',
				value: 'RESIDENTIAL_PRIVATE',
				checked: false,
			},
			{
				id: '103',
				label: 'Datacenter Shared',
				value: 'DATACENTER_SHARED',
				checked: false,
			},
		],
	},
	{
		id: '2',
		queryName: 'unit',
		name: 'Unit',
		options: [
			{
				id: '201',
				label: 'Residential Premium',
				value: 'RESIDENTIAL-PREMIUM',
				checked: false,
			},
		],
	},
	{
		id: '3',
		queryName: 'price',
		name: 'Price',
		options: [
			{
				id: '301',
				label: 'Residential Premium',
				value: 'RESIDENTIAL-PREMIUM',
				checked: false,
			},
		],
	},
	{
		id: '4',
		queryName: 'agent',
		name: 'Agent',
		options: [
			{
				id: '401',
				label: 'Residential Premium',
				value: 'RESIDENTIAL-PREMIUM',
				checked: false,
			},
		],
	},
	{
		name: 'Status',
		queryName: 'status',
		id: '5',
		options: [
			{
				label: 'Success',
				id: '501',
				value: 'success',
				checked: false,
			},
			{
				id: '502',
				label: 'Failure',
				value: 'failure',
				checked: false,
			},
		],
	},
	{
		name: 'Date range',
		queryName: 'intervalDays',
		id: '6',
		options: [
			{
				label: 'Last 24 hours',
				value: '24',
				id: '601',
				checked: false,
			},
			{
				label: 'Last 7 days',
				id: '602',
				value: '7',
				checked: false,
			},
			{
				id: '603',
				label: 'Last 30 days',
				value: '30',
				checked: false,
			},
		],
	},
];

const cache = {};

const requestSend = async (selected, page, sorting) => {
	let filtersGathered: any = selected.map(filter => {
		if (filter.options) {
			return {
				name: filter.name,
				queryName: filter.queryName,
				options: filter.options.filter(({ checked }) => checked),
			};
		}
	});

	let request = new URL(`http://localhost:8088/monitor/admin?limit=10`);
	let params: any = {};
	params.page = page + 1;

	filtersGathered.map(filter => {
		if (filter?.options?.length > 0) {
			let optionValues = filter.options.map(option => {
				return option.value;
			});

			params[filter.queryName] = optionValues.join(',');
		}
		if (filter.name === 'User ID' && filter.value !== '') {
			params[filter.queryName] = filter.value;
		}
	});

	if (sorting.sortBy !== '') {
		params.sortBy = sorting.sortBy;
		params.sortOrder = sorting.sortOrder;
	}

	Object.keys(params).forEach(key => {
		return request.searchParams.append(key, params[key]);
	});

	let key = request.search;

	if (cache[key]) {
		return cache[key];
	}

	let username = 'geonodeadminuser';
	let password = '5CnukmmeuUqnyRz6r6XHg9f6SCwFWQXt';
	const response = await customTrial.get(`/admin/custom-plans${request.search}`, {}, { auth: { username, password } });

	cache[key] = response.data;
	return response.data;
};

const TrialManagement = (props: ITrialManagementProps) => {
	const { createNewTrial } = props;
	const [openFilters, setOpenFilters] = useState(false);
	const [dateRange, setDateRange] = useState<any[]>([null, null]);
	const [selected, setSelected] = useState(filtersStructure);
	const [appliedFilters, setAllAppliedFilters] = useState<Array<AppliedFilters[]>>([]);
	const [userIdSearch, setUserIdSearch] = useState('');
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(3);
	const [loading, setLoading] = useState(false)
	const [tableData, setTableData] = useState<TableData[]>([]);
	const [sorting, setSorting] = useState({
		sortBy: '',
		sortOrder: '',
	});

	const sendRequest = useMemo(() => {
		return debounce((...args: any[]) => {
			// @ts-ignore
			requestSend(...args)
			.then(res => {
				setLoading(false)
				setTableData(res.data)
				setTotalPages(Math.ceil(res.count/res.limit))
			})
			.catch(err => {
				setLoading(false)
			});
		}, 300);
	}, []);

	useEffect(() => {
		setLoading(true)
		setOpenFilters(false)
		sendRequest(selected, page, sorting);
	}, [selected, page, sorting, dateRange]);

	const ref = useRef<HTMLHeadingElement>(null);

	const handlePrevPage = () => {
		if (page > 0) {
			setPage(page - 1);
		}
	};

	const handleNextPage = () => {
		if (page + 2 <= totalPages) {
			setPage(page + 1);
		}
	};

	const handlePageClick = event => {
		setPage(event.selected);
	};

	const sortingHandling = heading => {
		setSorting(currValue => {
			if (currValue.sortBy !== heading) {
				return {
					sortBy: heading,
					sortOrder: 'asc',
				};
			}

			if (currValue.sortOrder === 'asc') {
				return {
					...currValue,
					sortOrder: 'desc',
				};
			}

			return {
				sortBy: '',
				sortOrder: '',
			};
		});
	};

	useEffect(() => {
		let filtersGathered: any = selected.map(filter => {
			return filter?.options?.filter(({ checked }) => checked);
		});

		setAllAppliedFilters(filtersGathered);
	}, [selected]);

	const addLabels = arr => {
		let labels = arr.map(elem => {
			return elem.label;
		});

		return labels.join(', ');
	};

	const setSelectedValue = (value, label) => {
		const nextOptions = [...filtersStructure];
		let filter = nextOptions.find(item => item.name === label);
		if (!filter) {
			return;
		}

		let option = filter.options?.find(option => option.value === value);
		if (!option) {
			return;
		}

		option.checked = !option.checked;
		setSelected(nextOptions);
	};

	const closeAndRefreshFilter = filters => {
		const nextSelected = [...selected];

		let filterCategory = nextSelected.find(elem => {
			if (elem.options) {
				return elem.options[0].label === filters[0].label;
			}
		});

		if (!filterCategory) {
			return;
		}

		filterCategory.options?.forEach(option => {
			option.checked = false;
		});
		setSelected(nextSelected);
	};

	useEffect(() => {
		let filtersGathered: any = selected.map(filter => {
			return filter?.options?.filter(({ checked }) => checked);
		});

		setAllAppliedFilters(filtersGathered);
	}, [selected]);

	return (
		<div className="relative customTrial-page ">
			<Header title="Custom trial management" actionLabel="Create new" actionHandler={createNewTrial} actionIcon={PlusIcon()} />
			<div>
				{
					loading ? (
						<Loader></Loader>
					) : (
						<div className="px-8 pt-5">
						<div className="flex justify-between items-baseline">
							<div className="flex gap-x-3">
								<div className="relative" ref={ref}>
									<button
										onClick={() => {
											setOpenFilters(!openFilters);
										}}
										className="flex items-center shadow-sm justify-between py-2.5 w-40	px-4 border border-gray-300 rounded-lg"
									>
										<div className="mr-2">
											<img src={`${process.env.PUBLIC_URL}/assets/icons/filterIcon.svg`}></img>
										</div>
										<div className="text-gray-700 font-medium	text-sm">Select Filters</div>
									</button>
									{openFilters && (
										<div style={{ height: '560px' }} className="absolute  top-12 rounded-lg dropDown overflow-y-auto bg-white w-80	z-10 px-3	pb-6 shadow-lg">
											{filtersStructure.map(filter => {
												if (filter.options) {
													return (
														<div className="pt-6" key={filter.id}>
															<Select
																dateRange={dateRange}
																setDateRange={setDateRange}
																setSelected={(value, label) => setSelectedValue(value, label)}
																dropdownOptions={filter}
																label={filter.name}
															></Select>
														</div>
													);
												} 
											})}
										</div>
									)}
								</div>
								<div className="flex flex-wrap gap-0.5 h-full items-baseline">
									{appliedFilters.map((filter, index) => {
										if (filter?.length > 0) {
											return (
												<div key={index} onClick={() => closeAndRefreshFilter(filter)} className="py-2.5 font-medium px-4 text-primary-base bg-primary-50 rounded-lg flex justify-between items-center">
													<div>{addLabels(filter)}</div>
													<div className="ml-2 cursor-pointer">
														<img src={process.env.PUBLIC_URL + '/assets/icons/closeFilter.svg'}></img>
													</div>
												</div>
											);
										}
									})}
								</div>
							</div>
							<div className="relative">
								<div className="w-5	h-5 absolute bottom-2.5 left-2.5">
									<img src={`${process.env.PUBLIC_URL}/assets/icons/search.svg`}></img>
								</div>
								<input
									value={''}
									placeholder="Search"
									className="generalSearchInput flex items-center border border-gray-300 py-2 pr-2.5 pl-9 focus:outline-none active:border-gray-300 focus:border-gray-300 text-base font-fontFamily-inter	font-normal	rounded-md w-full"
									onChange={() => {}}
								/>
							</div>
						</div>
	
						<div className="overflow-x-auto mt-6 tableWrapper">
							<table className="block overflow-x-auto relative">
								<thead>
									<tr className="text-xs	font-medium	text-gray-500 border-b">
										{tableHeading.map((heading, index) => {
											return (
												<th
													key={index}
													onClick={() => {
														sortingHandling(heading.value);
													}}
													className="cursor-pointer py-2 text-left px-4 font-medium min-w-32"
												>
													<div className="flex items-center">
														<span>{heading.name}</span>
														{sorting.sortBy === heading.value && sorting.sortOrder === 'desc' && (
															<span className="ml-2">
																<ArrowDownIcon className="h-2.5 w-2.5"></ArrowDownIcon>
															</span>
														)}
														{sorting.sortBy === heading.value && sorting.sortOrder === 'asc' && (
															<span className="ml-2">
																<ArrowUpIcon className="h-2.5 w-2.5"></ArrowUpIcon>
															</span>
														)}
													</div>
												</th>
											);
										})}
									</tr>
								</thead>
								{
									tableData.length ? (
										<tbody className="text-gray-500 text-sm font-normal">
										{tableData.map((row, index) => {
											return (
												<tr key={index}>
													<td className="p-4 font-normal whitespace-nowrap">{row.id}</td>
													<td className="p-4 whitespace-nowrap">{row.serviceType}</td>
													<td className="p-4 whitespace-nowrap">{row.units}</td>
													<td className="p-4 whitespace-nowrap">${row.price}</td>
													<td className="p-4 whitespace-nowrap">
														<div className="flex items-center">
															<div>{row.assignees.length} user(s)</div>
															<div className="flex ml-4 assigneeInfo relative cursor-pointer">
																{row.assignees.slice(0, 5).map((participator, index) => {
																	return (
																		<div style={{ borderRadius: '200px', border: '2px solid white' }} className="text-gray-border text-xs	bg-support-1-base p-1 -ml-2 font-medium" key={index}>
																			{participator.substring(0, 2).toUpperCase()}
																		</div>
																	);
																})}
															</div>
														</div>
													</td>
													<td className="p-4 whitespace-nowrap">
														<span className="block">{row.from}</span>
														<span className="block">{row.to}</span>
													</td>
													<td className="p-4 whitespace-nowrap">{row.created}</td>
													<td className="py-4 px-8 whitespace-nowrap">
														<span className="inline-flex w-6 mr-3">
															<img src={row.agentImage}></img>
														</span>
														<span style={{ verticalAlign: 'super' }}>{row.agent}</span>
													</td>
													<td className="px-12 whitespace-nowrap">
														<span
															className={`${
																row.status === 'Active' ? 'text-success-700 bg-success-50' : row.status === 'Draft' ? 'text-warning-700 bg-warning-50' : 'text-error-700 bg-error-50'
															} py-0.5 font-medium	px-2 rounded-2xl`}
														>
															{row.status}
														</span>
													</td>
													<Actions></Actions>
												</tr>
											);
										})}
									</tbody>
									) : (
										<tbody className="p-3 w-full flex justify-center sticky left-0"><tr><td>No data is found</td></tr></tbody>

									)
								}

							</table>
						</div>
						<div>
							<nav className="bg-white z-0 lg:px-4 py-3 flex items-center justify-between border-t border-gray-200" aria-label="Pagination">
								<div className="flex justify-between w-full">
									<div
										onClick={() => {
											handlePrevPage();
										}}
										className="relative cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
									>
										<ArrowLeftIcon className="h-3 w-3" aria-hidden="true" fill="#344054" />
										<div className="ml-3">Previous</div>
									</div>
									<div className="hidden lg:block text-sm text-gray-700 paginationWrapper">
										<ReactPaginate
											breakLabel="..."
											nextLabel="next >"
											forcePage={page}
											onPageChange={event => handlePageClick(event)}
											pageRangeDisplayed={3}
											pageCount={totalPages}
											pageClassName={`cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-medium page`}
											// renderOnZeroPageCount={null}
										/>
									</div>
	
									<div
										onClick={() => {
											handleNextPage();
										}}
										className=" relative cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
									>
										<div className="mr-3">Next</div>
										<ArrowRightIcon className="h-3 w-3" aria-hidden="true" fill="#344054" />
									</div>
								</div>
							</nav>
						</div>
					</div>
					)
				}



			</div>
		</div>
	);
};

const Actions = () => {
	const [openActions, setOpenActions] = useState(false);

	return (
		<td className="whitespace-nowrap relative" onClick={() => setOpenActions(!openActions)}>
			<img src={`${process.env.PUBLIC_URL}/assets/icons/actionDots.svg`}></img>
			{openActions && (
				<div className="absolute text-sm font-fontFamily-inter shadow-lg bg-white z-20 rounded-lg pr-9">
					<div className="py-2.5 px-4 text-gray-700">Edit</div>
					<div className="py-2.5 px-4 text-gray-700">Duplicate</div>
					<div className="py-2.5 px-4 text-supportMandy-base">Delete</div>
				</div>
			)}
		</td>
	);
};

export default TrialManagement;
