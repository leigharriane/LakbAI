import { useDispatch } from 'react-redux'
import { lastMonth, nextMonth } from '../store/calendar'

export default function SideCalendarTitle({ year, month }: { year: number; month: number }) {
	const dispatch = useDispatch()
	return (
		<div className="px-2 pb-2 flex text-white justify-between items-center">
			<span>
				{month == 1 ? 'January' : ''}
				{month == 2 ? 'February' : ''}
				{month == 3 ? 'March' : ''}
				{month == 4 ? 'April' : ''}
				{month == 5 ? 'May' : ''}
				{month == 6 ? 'June' : ''}
				{month == 7 ? 'July' : ''}
				{month == 8 ? 'August' : ''}
				{month == 9 ? 'September' : ''}
				{month == 10 ? 'October' : ''}
				{month == 11 ? 'November' : ''}
				{month == 12 ? 'December' : ''} {" "}
				{year}
			</span>
			<div className="flex items-center">
				<img
					src="/left.svg"
					alt="logo"
					width={24}
					height={24}
					className="cursor-pointer"
					onClick={() => dispatch(lastMonth())}
				/>
				<img
					src="/right.svg"
					alt="logo"
					width={24}
					height={24}
					className="cursor-pointer"
					onClick={() => dispatch(nextMonth())}
				/>
			</div>
		</div>
	)
}
