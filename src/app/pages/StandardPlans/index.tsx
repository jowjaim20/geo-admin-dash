import Header from '@components/Header';
import { PlusIcon } from '@utils/svg-icons';
import { useState } from 'react';
const mockStandardPlansData = [
	{
		id: 1,
		title: 'test1',
	},
	{
		id: 2,
		title: 'test2',
	},
	{
		id: 3,
		title: 'test3',
	},
	{
		id: 4,
		title: 'test4',
	},
	{
		id: 5,
		title: 'test5',
	},
	{
		id: 6,
		title: 'test6',
	},
	{
		id: 7,
		title: 'test7',
	},
	{
		id: 8,
		title: 'test8',
	},
	// {
	// 	id: 9,
	// 	title: 'test9',
	// },
	// {
	// 	id: 10,
	// 	title: 'test10',
	// },
];
const StandardPlansPage = () => {
	const [plans, setPlans] = useState(mockStandardPlansData);
	const [currentPage, setCurrentPage] = useState(1);
	const [plansPerPage, setPlansPerPage] = useState(1);
	const testActionHandler = () => {
		console.log('standard plans');
	};
	const indexOflastPlan = currentPage * plansPerPage;
	const indexOfFirstPlan = indexOflastPlan - plansPerPage;
	const currentPlans = plans.slice(indexOfFirstPlan, indexOflastPlan);

	return (
		<div className="flex flex-col ">
			<div className="">
				<Header title="Standard plan management" actionLabel="Create new" actionHandler={() => testActionHandler()} actionIcon={PlusIcon()} />
			</div>
			<div className="flex px-8 py-4 border-b border-gray-200">
				<button className="flex items-center shadow-sm justify-between py-2.5 w-40	px-4 border border-gray-300 rounded-lg mr-auto">
					<div className="mr-2">
						<img src={`${process.env.PUBLIC_URL}/assets/icons/filterIcon.svg`} alt="filter icon"></img>
					</div>
					<div className="text-gray-700 font-medium	text-sm">Select Filters</div>
				</button>
				<div className="relative">
					<div className="w-5	h-5 absolute bottom-2.5 left-2.5">
						<img src={`${process.env.PUBLIC_URL}/assets/icons/search.svg`} alt="search icon"></img>
					</div>
					<input
						value={''}
						placeholder="Search"
						className="generalSearchInput flex items-center border border-gray-300 py-2 pr-2.5 pl-9 focus:outline-none active:border-gray-300 focus:border-gray-300 text-base font-fontFamily-inter	font-normal	rounded-md w-full"
						onChange={() => {}}
					/>
				</div>
			</div>
			<div className="flex flex-col  ">
				<div className="flex ">
					<div className=" text-xs text-gray-500 px-4 py-3">ID</div>
					<div className="text-xs text-gray-500 px-4 py-3    ">Service type</div>
					<div className="text-xs text-gray-500 px-4 py-3   ">Service</div>
					<div className="text-xs text-gray-500 px-4 py-3   ">Plan</div>
					<div className="text-xs text-gray-500 px-4 py-3   ">Unit</div>
					<div className="text-xs text-gray-500 px-4 py-3   ">Price</div>
					<div className="text-xs text-gray-500 px-4 py-3   ">Interval</div>
					<div className="text-xs text-gray-500 px-4 py-3   ">Assigned to</div>
					<div className="text-xs text-gray-500 px-4 py-3  ">Trial</div>
					<div className="text-xs text-gray-500 px-4 py-3   ">Discount</div>
					<div className="text-xs text-gray-500 px-4 py-3   ">Created</div>
					<div className="text-xs text-gray-500 px-4 py-3   ">Expiry</div>
					<div className="text-xs text-gray-500 px-4 py-3   ">Agent</div>
					<div className="text-xs text-gray-500 px-4 py-3   ">Status</div>
					<div className="text-xs text-gray-500 px-4 py-3   ">&nbsp;</div>
				</div>

				<StandardPlans plans={currentPlans} />
				<Pagination plansPerpage={plansPerPage} totalPlans={plans.length} setCurrentPage={setCurrentPage} currentPage={currentPage} />
			</div>
		</div>
	);
};

export default StandardPlansPage;

const StandardPlans = ({ plans }) => {
	return (
		<ul>
			{plans.map(plan => (
				<Plan key={plan.id} title={plan.title} />
			))}
		</ul>
	);
};

const Plan = ({ title = '' }) => {
	return (
		<ul className="flex gap-4">
			<li>{title}</li>
			<li>{title}</li>
			<li>{title}</li>
			<li>{title}</li>
		</ul>
	);
};
const Pagination = ({ plansPerpage, totalPlans, setCurrentPage, currentPage }) => {
	const pageNumbers: number[] = [];
	for (let i = 1; i <= Math.ceil(totalPlans / plansPerpage); i++) {
		pageNumbers.push(i);
	}
	const indexOflastPlan = pageNumbers.length - 1;
	const indexOfFirstPlan = currentPage - 3;
	const backNumbers = pageNumbers.slice(-3);

	return (
		<nav>
			{/* <ul className="flex gap-1">
				{pageNumbers.map(num => (
					<li className={`flex justify-center items-center rounded-lg ${currentPage === num ? 'bg-primary-50' : ''}  w-10 h-10 text-primary-600`} onClick={() => setCurrentPage(num)} key={num}>
						{num}
					</li>
				))}
			</ul> */}
			<ul className="flex gap-1">
				{pageNumbers
					.filter(num => num < 4)
					.map(num => (
						<li
							className={`flex justify-center items-center rounded-lg ${currentPage === num ? 'bg-primary-50' : ''}  w-10 h-10 ${currentPage === num ? 'text-primary-600' : 'text-gray-500'} `}
							onClick={() => setCurrentPage(num)}
							key={num}
						>
							{num}
						</li>
					))}
				{<div>...</div>}
				{backNumbers.map(num => (
					<li className={`flex justify-center items-center rounded-lg ${currentPage === num ? 'bg-primary-50' : ''}  w-10 h-10 text-primary-600`} onClick={() => setCurrentPage(num)} key={num}>
						{num}
					</li>
				))}
			</ul>
		</nav>
	);
};
