import React from 'react';
import { GeoButton } from '@components/form-controls/Button';
import { TrashIcon } from '@utils/svg-icons';

interface ITableItemProps {
	index: any;
	data: any;
	action?: (data: any, idx: any) => void;
}
const TableItem: React.FC<ITableItemProps> = props => {
	const { index, data, action } = props;

	// const customWidthSize = (idx: number) => {
	// 	switch (idx) {
	// 		case 0:
	// 			return 'w-48';
	// 		default:
	// 			return '';
	// 	}
	// };

	return (
		<tr className="bg-background-high">
			{Object.keys(data).map(d => (
				<td key={d} className={`px-2 text-left lg:px-8 py-4 text-sm leading-5 font-normal text-gray-900`}>
					<span>{data[d]}</span>
				</td>
			))}
			{action && (
				<td className="px-5 lg:px-8 py-4 text-sm leading-5 flex justify-center lg:block font-normal text-support-1-base">
					<div className="flex justify-end">
						<GeoButton size="sm" variant="linkColor" iconOnly iconSettings={{ placement: 'leading', iconElement: TrashIcon() }} onClick={() => (action ? action(data, index) : null)} />
					</div>
				</td>
			)}
		</tr>
	);
};

export default TableItem;
