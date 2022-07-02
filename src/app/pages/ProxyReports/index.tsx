import React, { useState, useEffect, useRef, useMemo } from 'react';
import { GeoButton } from '@components/form-controls/Button';
import { ChevronDownIcon, ChevronUpIcon, ArrowRightIcon, ArrowLeftIcon, ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';
import './style.scss';
import { Select } from './Select';
import { proxyStatusService } from '@services/index';
import * as Flags from 'react-flags-select';
import moment from "moment"
import debounce from 'lodash/debounce';
import capitalize from 'lodash/capitalize';

import ReactPaginate from 'react-paginate';
interface TableData {
	user_id: string;
	email?: string;
	service_type: string;
	unit: string;
	country: string;
	provider: string;
	host: string;
	protocol: string;
	execDate: string;
	avg_latency_sec: number;
	executed_at: string,
	status: string;
	total_requests_count: number;
	success_count: number;
	fail_count: number;
	total_bandwidth: string;
	success_percentage: number
}

const tableHeading = [
	{ name: 'User ID', value: 'userId' },
	{ name: 'Service Type', value: 'serviceType' },
	{ name: 'Unit', value: 'unit' },
	{ name: 'Country', value: 'country' },
	{ name: 'Supplier', value: 'supplier' },
	{ name: 'Host', value: 'host' },
	{ name: 'Protocol', value: 'protocol' },
	{ name: 'Execution date', value: 'executionDate' },
	{ name: 'Avg. latency(sec)', value: 'latency' },
	{ name: 'Status', value: 'status' },
	{ name: 'Total requests per user', value: 'totalReqPerUser' },
	{ name: 'Total successful requests per user', value: 'totalSuccessReqPerUser' },
	{ name: 'Total failure requests per user', value: 'totalFailedReqPerUser' },
];

const filtersStructure = [
	{
		name: 'Supplier',
		queryName: 'provider',
		id: '1',
		options: [
			{
				id: '101',
				label: 'IP Royal',
				value: 'ipRoyal',
				checked: false,
			},
			{
				id: '102',
				label: 'ProxyRack',
				value: 'proxyRack ',
				checked: false,
			}
		],
	},
	{
		name: 'Country',
		queryName: 'country',
		id: '2',
		options: []
	},
	{
		id: '3',
		queryName: 'serviceType',
		name: 'Service type',
		options: [
			{
				id: '301',
				label: 'Residential Premium',
				value: 'RESIDENTIAL-PREMIUM',
				checked: true,
			},
			{
				id: '302',
				label: 'Residential Private',
				value: 'RESIDENTIAL_PRIVATE',
				checked: false,
			},
			{
				id: '303',
				label: 'Datacenter Shared',
				value: 'DATACENTER_SHARED',
				checked: false,
			},
		],
	},
	{
		name: 'User ID',
		queryName: 'userId',
		value: '',
		id: '4',
	},
	{
		name: 'Protocol',
		queryName: 'protocol',
		id: '5',
		options: [
			{
				id: '501',
				label: 'http',
				value: 'http',
				checked: false,
			},
			{
				id: '502',
				label: 'https',
				value: 'https',
				checked: false,
			},
		],
	},
	{
		name: 'Host',
		queryName: 'host',
		id: '6',
		options: [
				{
					id: '601',
					label: 'First host',
					value: 'first-host',
					checked: false,
				},
		],
	},
	// {
	// 	name: 'Status',
	// 	queryName: 'status',
	// 	id: '7',
	// 	options: [
	// 		{
	// 			label: 'Success',
	// 			id: '701',
	// 			value: 'success',
	// 			checked: false,
	// 		},
	// 		{
	// 			id: '702',
	// 			label: 'Failure',
	// 			value: 'failure',
	// 			checked: false,
	// 		},
	// 	],
	// },
	{
		name: 'Date range',
		queryName: 'intervalDays',
		id: '8',
		options: [
			{
				label: 'Last 24 hours',
				value: '1',
				id: '801',
				checked: false,
			},
			{
				label: 'Last 7 days',
				id: '802',
				value: '7',
				checked: false,
			},
			{
				id: '803',
				label: 'Last 30 days',
				value: '30',
				checked: false,
			},
			// {
			// 	id: '804',
			// 	label: 'Custom',
			// 	value: 'custom',
			// 	checked: false,
			// },
		],
	},
];

interface AppliedFilters {
	value: string;
	label: string;
	checked: boolean;
}

const cache = {};

const requestSend = async (selected, userIdSearch, page, sorting, dateRange,) => {
	let filtersGathered: any = selected.map(filter => {
		if (filter.options) {
			return {
				name: filter.name,
				queryName: filter.queryName,
				options: filter.options.filter(({ checked }) => checked),
			};
		} else if (filter.name === 'User ID') {
			return {
				name: filter.name,
				queryName: filter.queryName,
				value: userIdSearch,
			};
		}
	});

	let request = new URL(`http://localhost:8088/monitor/admin?limit=10`);
	let params: any = {};
	params.page = page + 1;

	filtersGathered.map(filter => {
		if (filter?.options?.length > 0) {
			let optionValues = filter.options.map(option => {
				if (option.value === 'custom') {
					return `${dateRange.join('-')}`;
				}
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
	const response = await proxyStatusService.get(`/admin${request.search}`, {}, { auth: { username, password } });

	cache[key] = response.data;
	return response.data;
};

const downloadData = (tableData) => {
	let saveData = (function () {
		let a = document.createElement('a');
		return function (data, fileName) {
			let json = data,
				blob = new Blob([json], { type: 'octet/stream' }),
				url = window.URL.createObjectURL(blob);
			a.href = url;
			a.download = fileName;
			a.click();
			window.URL.revokeObjectURL(url);
		};
	})();
	const items = tableData;
	const replacer = (key, value) => {
		if (value === null || value === '') {
			return 'N/A';
		} else if (Array.isArray(value)) {
			return value.join();
		} else if (typeof value === 'number') {
			return value.toFixed(0);
		}
		return value;
	};
	const header = Object.keys(items[0]);
	// .filter(
	// 	(key) =>
	// 		![
	// 			'_id',
	// 			'city',
	// 			'created_at',
	// 			'lastChecked',
	// 			'region',
	// 			'workingPercentage',
	// 			'hostName',
	// 			'google',
	// 			'workingPercent',
	// 		].includes(key)
	// );

	const formatted = [header.join(','), ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))].join('\r\n');

	saveData(formatted, 'Proxy_Checker.csv');
};

export const Loader = () => {
	return (
		<div className="flex justify-center mt-10">
       <div className="loader"></div>
		</div>
	)
}

const ProxyReports = () => {
	const [openFilters, setOpenFilters] = useState(false);
	const [tableData, setTableData] = useState<TableData[]>([]);
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(3);
	const [selected, setSelected] = useState(filtersStructure);
	const [appliedFilters, setAllAppliedFilters] = useState<Array<AppliedFilters[]>>([]);
	const [userIdSearch, setUserIdSearch] = useState('');
	const [hostListFiler, setHostListFilter] = useState<any[]>([])
	const [countriesFilter, setcontriesFilter] = useState<any[]>([])
	const [generalSearch, setGeneralSearch] = useState('');
	const [dateRange, setDateRange] = useState<any[]>([null, null]);
	const [loading, setLoading] = useState(false)

	const [sorting, setSorting] = useState({
		sortBy: '',
		sortOrder: '',
	});

	const ref = useRef<HTMLHeadingElement>(null);

	const sendRequest = useMemo(() => {
		return debounce((...args: any[]) => {
			// @ts-ignore
			requestSend(...args)
			.then(res => {
				setLoading(false)
				setTableData(res.data)
				setTotalPages(Math.ceil(res.count / res.limit))
			})
			.catch(err => {
				setLoading(false)
			});
		}, 300);
	}, []);

	useEffect(() => {
		setGeneralSearch("");
		let params: any = {};
		let serviceType = selected.find((filter) => filter.name === "Service type");
		let request = new URL(`http://localhost:8088/monitor/admin?limit=10`);

		if (!serviceType) {
			return;
		}

		let optionValues = serviceType?.options.filter(option => option.checked).map((elem) => elem.value);
		params.page = page + 1;

		params[serviceType.queryName] = optionValues.join(',');
		Object.keys(params).forEach(key => {
			return request.searchParams.append(key, params[key]);
		});
			
		let username = 'geonodeadminuser';
		let password = '5CnukmmeuUqnyRz6r6XHg9f6SCwFWQXt';
		const response = proxyStatusService.get(`/admin${request.search}`, {}, { auth: { username, password } });
		response.then((res) => {
			let elems: any[] = [];
			let countries: any[] = []
     	setHostListFilter(() => {
				res.data.data.map((elem: any) => {
					elems.push(elem.host)
				})
				let unique = new Set(elems)
				return [...unique]
			 })

			setcontriesFilter(() => {
				res.data.data.map((elem: any) => {
					countries.push(elem.country)
				})
				let unique = new Set(countries)
				return [...unique]
			 })
		})
	}, [page])

	useEffect(() => {
		let filterStructure = [...filtersStructure];
		let options: any[] = []
		let hostFilter = filterStructure.find((filter) => filter.name === "Host")
		hostListFiler.forEach((host, index) => {
			options.push({
				id: `60${index}`,
				label: host,
				value: host,
				checked: false,
			},)
		})

		if (!hostFilter) {
			return;
		}

		hostFilter.options = options
	}, [hostListFiler])

	useEffect(() => {
		let filterStructure = [...filtersStructure];
		let options: any[] = []
		let countryFilter = filterStructure.find((filter) => filter.name === "Country")

		countriesFilter.forEach((country, index) => {
			let Icon = Flags[capitalize(country)] || (() => null);

			if (country) {
				options.push({
					id: `20${index}`,
					label: country.toUpperCase(),
					icon: <Icon></Icon>,
					value: country,
					checked: false,
				})
			}
		})

		if (!countryFilter) {
			return;
		}

		countryFilter.options = options
	}, [countriesFilter])

	useEffect(() => {
		setLoading(true)
	}, [])

	useEffect(() => {
		setGeneralSearch("");
		setLoading(true)
		setOpenFilters(false)
		sendRequest(selected, userIdSearch, page, sorting, dateRange);
	}, [selected, page, sorting, dateRange]);

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
		let numberTruthyOptions = 0;
		const nextOptions = [...filtersStructure];
		let filter = nextOptions.find(item => item.name === label);
		if (!filter) {
			return;
		}

		let option = filter.options?.find(option => option.value === value);
		if (!option) {
			return;
		}

		filter.options?.forEach((options) => {
			if (options.checked === true) {
				numberTruthyOptions++
			}
		})

		if (filter.name === "Service type" && numberTruthyOptions <= 1) {
			option.checked = true;
		} else {
			option.checked = !option.checked;
		}

		setSelected(nextOptions);
	};

	const closeAndRefreshFilter = filters => {
		const nextSelected = [...selected];
		let numberTruthyOptions = 0;

		let filterCategory = nextSelected.find(elem => {
			if (elem.options && elem.options.length) {
				return elem.options[0].label === filters[0].label;
			}
		});

		if (!filterCategory) {
			return;
		}

		filterCategory.options?.forEach((options) => {
			if (options.checked === true) {
				numberTruthyOptions++
			}
		})

		filterCategory.options?.forEach(option => {

			if (filterCategory.name === "Service type") {
				return;
			} else {
				option.checked = false;
			}
		});

		setSelected(nextSelected);
	};

	const searchUserId = value => {
		setUserIdSearch(value);
		const nextSelected = [...selected];
		let filterCategory = nextSelected.find(elem => elem.name === 'User ID');
		if (!filterCategory) {
			return;
		}

		filterCategory.value = userIdSearch;

		setSelected(nextSelected);
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

	const handleGeneralSearch = (value) => {
		setGeneralSearch(value);
		if (value.trim().length !== 0) {
			let searchedData = tableData.filter((row) => {
				 return Object.values(row).find((elem) => {
					 return elem.toString().includes(value)
				})
			})

			setTableData(searchedData)
		}
	}

	return (
		<div className="proxyReports-page font-fontFamily-inter">
			<div className="flex justify-between items-center pb-3 px-8 pt-8">
				<h1 className="font-semibold text-2xl	text-gray-900 block">Proxy reports</h1>
				<div>
					<GeoButton
						label="Export"
						variant="primary"
						onClick={() => {
							downloadData(tableData);
						}}
					/>
				</div>
			</div>
			<div className="px-8 pt-10">
				<img className="w-full" src={process.env.PUBLIC_URL + '/assets/icons/graph.svg'}></img>
			</div>

			{
				loading ? (
				<Loader></Loader>
				) : (
					<div className="px-8 pt-16">
					<div className="flex justify-between items-baseline">
						<div className="flex gap-x-3">
							<div className="relative" ref={ref}>
								<button
									onClick={() => {
										setOpenFilters(!openFilters);
									}}
									className="flex items-center shadow-sm justify-between py-2.5	px-4 w-24 border border-gray-300 rounded-lg"
								>
									<div className="text-gray-700 font-medium	text-sm">Filter</div>
									<div style={{ width: '20px', height: '20px' }}>
										{openFilters ? (
											<>
												<ChevronUpIcon fill="rgba(52, 64, 84, 1)" />
											</>
										) : (
											<>
												<ChevronDownIcon fill="rgba(52, 64, 84, 1)" />
											</>
										)}
									</div>
								</button>
								{openFilters && (
									<div style={{ height: '724px' }} className="absolute  top-12 rounded-lg dropDown overflow-y-auto bg-white w-80	z-10 px-3	pb-6 shadow-lg">
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
											} else {
												return (
													<div className="pt-6 relative" key={filter.id}>
														<div className="w-5	h-5 absolute bottom-2 left-2.5">
															<img src={`${process.env.PUBLIC_URL}/assets/icons/search.svg`}></img>
														</div>
														<div className="block text-sm font-medium text-gray-700 pb-1.5">{filter.name}</div>
														<input
															value={userIdSearch}
															className="flex items-center border border-gray-300 py-1.5 pr-1 pl-9 focus:outline-none active:border-gray-300 focus:border-gray-300 rounded-md w-full"
															onChange={e => searchUserId(e.target.value)}
														/>
													</div>
												);
											}
										})}
									</div>
								)}
							</div>
							<div className="flex flex-wrap gap-0.5 h-full items-baseline mr-2">
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
							<div className="w-5	h-5 absolute bottom-3 left-2.5">
								<img src={`${process.env.PUBLIC_URL}/assets/icons/search.svg`}></img>
							</div>
							<input
								value={generalSearch}
								placeholder="Search"
								className="generalSearchInput flex items-center border border-gray-300 py-2.5 pr-2.5 pl-9 focus:outline-none active:border-gray-300 focus:border-gray-300 rounded-md w-full"
								onChange={e => handleGeneralSearch(e.target.value)}
							/>
						</div>
					</div>

					<div className="overflow-x-auto mt-6 tableWrapper">
						<table className="block overflow-x-auto relative">
							<thead>
								<tr className="bg-gray-50 text-xs	font-medium	text-gray-500 border-b">
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
													<td className="p-4 font-normal">
														<span className="text-gray-900 font-medium">{row.user_id ? row.user_id : "No data" }</span> {row.email}
													</td>
													<td className="p-4 whitespace-nowrap">{row.service_type ? row.service_type : "No data" }</td>
													<td className="p-4 whitespace-nowrap">{row.total_bandwidth ? row.total_bandwidth : "No data"}</td>
													<td className="p-4 whitespace-nowrap">{(row.country ? (row.country).toUpperCase() : "No data")}</td>
													<td className="p-4 whitespace-nowrap">{row.provider ? row.provider : "No data"}</td>
													<td className="p-4 whitespace-nowrap">{row.host ? row.host : "No data"}</td>
													<td className="p-4 whitespace-nowrap">{row.protocol ? row.protocol : "No data"}</td>
													<td className="py-4 px-8 whitespace-nowrap">{row.executed_at ? moment(row.executed_at).format("MMMM Do Y") : "No data"}</td>
													<td className="py-4 px-10 whitespace-nowrap">{row.avg_latency_sec || row.avg_latency_sec === 0 ? row.avg_latency_sec : "No data"}</td>
													<td className="p-4 whitespace-nowrap">
														<span className={`${row.success_percentage >= 90 ? 'text-success-700 bg-success-50' : 'text-error-700 bg-error-50'} py-0.5 px-2 rounded-2xl`}>{row.success_percentage >= 90 ? 'Success' : 'Fail'}</span>
													</td>
													<td className="py-4 px-8 whitespace-nowrap">{row.total_requests_count ? row.total_requests_count : "No data"}</td>
													<td className="py-4 px-8 whitespace-nowrap">{row.success_count ? row.success_count : "No data"}</td>
													<td className="py-4 px-8 whitespace-nowrap">{row.fail_count ? row.fail_count : "No data"}</td>
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
	);
};


export default ProxyReports;
