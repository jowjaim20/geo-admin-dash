import React, { useState, useEffect } from 'react';
import EmptyContainer from '@components/EmptyContainer';
import TableItem from './TableItem';

type TableHeaderTypes = {
	title: string;
	icon?: any;
	key?: any;
};

interface IGeoTableProps {
	columns: TableHeaderTypes[];
	dataSource?: any[];
	action?: (data: any, idx: any) => void;
	loading: boolean;
	addNewData?: () => void;
	size?: number;
}

const GeoTable = (props: IGeoTableProps) => {
	const { columns = [], dataSource = [], action, loading } = props;

	const [isLoading, setIsLoading] = useState<boolean>(false);
	useEffect(() => {
		setIsLoading(loading);
		return () => {
			setIsLoading(false);
		};
	}, [loading]);

	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="mt-8 flex flex-col">
				<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle">
						<div className="rounded-lg overflow-hidden shadow-sm border border-neutral-200 ring-1 ring-black ring-opacity-5">
							<table className="min-w-full divide-y divide-gray-200 ">
								<thead className="bg-gray-50">
									<tr>
										{columns.map((h, idx) => (
											<th
												key={h.title}
												scope="col"
												className={`px-2 lg:px-8 py-3  ${h.title === 'Action' ? 'text-center lg:text-right' : 'text-left'} text-xs  font-medium text-gray-500 lg:whitespace-nowrap tracking-wider`}
											>
												<span>{h.title}</span>
												{h.icon && <span>{h.icon}</span>}
											</th>
										))}
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
									{isLoading ? (
										<tr>
											<td className="bg-background-high" height={244} colSpan={7}>
												{/* <CustomLoader /> */}
												loading ...
											</td>
										</tr>
									) : dataSource.length !== 0 ? (
										dataSource.map((el: any, index) => <TableItem key={index} data={el} index={index} action={action} />)
									) : (
										<tr className="">
											<td className="bg-background-high px-2 lg:px-8 py-4 text-center tracking-wider text-white" colSpan={7}>
												<EmptyContainer title="No data" />
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GeoTable;
