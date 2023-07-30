'use client'
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
// import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from 'react'
// import { time } from 'console'
// import { start } from 'repl'

// const events = [
// 	{ title: 'Event', start: new Date('2023-07-31T03:24:00'), end: new Date('2023-08-01T20:24:00'), classNames: 'flex flex-col br-pink' },
// ]

// export function Calendar() {
// 	return (
// 		<FullCalendar
// 			plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
// 			initialView='timeGridWeek'
// 			headerToolbar={{
// 				start: 'title',
// 				center: 'dayGridMonth,timeGridWeek,timeGridDay',
// 				end: 'today prev,next',
// 			}}
// 			weekends={true}
// 			events={events}
// 			eventContent={renderEventContent}
// 			editable={true}
// 			eventTimeFormat={{
// 				hour: 'numeric',
// 				minute: '2-digit',
// 				meridiem: 'short'
// 			}}
// 		/>
// 	)
// }

// function renderEventContent(eventInfo: { timeText: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; event: { title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined } }) {
// 	return (
// 		<>
// 			<b>{eventInfo.timeText}</b>
// 			<i>{eventInfo.event.title}</i>
// 		</>
// 	)
// }

import Header from '../components/Header'
import SideCalendar from '../components/SideCalendar'
import SideCalendarTitle from '../components/SideCalendarTitle'
import { useSelector } from 'react-redux'
import { currentCalendar } from '../store/calendar'
import ScheduleCalendar from '../components/ScheduleCalendar'
import getThisWeek from '@/app/util/getThisWeek'
import { useState } from 'react'
import AddScheduleButton from '@/components/AddScheduleButton'
import AddScheduleModal from '../components/AddScheduleModal'
import formatDay from '@/app/util/formatDay'
import Nav from '@/components/Nav'

export default function Calendar() {
	const { year, month, days } = useSelector(currentCalendar)
	const [isSideCalendar, setIsSideCalendar] = useState<boolean>(true)
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
	const [modalDate, setModalDate] = useState<string>(formatDay(new Date()))
	const [timeIndex, setTimeIndex] = useState<number>(0)
	const [month2, setMonth2] = useState<string>('')

	
	return (
		<>
			{/* <Nav />
		<div className='h-[70px]'></div> */}
			<Header
				year={year}
				month={month}
				isSideCalendar={isSideCalendar}
				setIsSideCalendar={setIsSideCalendar}
			/>
			<main className="flex h-[calc(100%_-_3.5rem)] flex-1">
				<AddScheduleButton
					isSideCalendar={isSideCalendar}
					isOpenModal={isOpenModal}
					setIsOpenModal={setIsOpenModal}
				/>
				<div className={`p-5 flex flex-col mt-[65px] ${isSideCalendar ? 'block' : 'hidden'}`}>
					<SideCalendarTitle year={year} month={month} />
					<SideCalendar days={days} />
				</div>
				<div className="flex flex-col h-full overflow-x-scroll flex-1 pr-2">
					<ScheduleCalendar
						days={getThisWeek(days)}
						setModalDate={setModalDate}
						setTimeIndex={setTimeIndex}
						setIsOpenModal={setIsOpenModal}
						isDeleteOpen={isDeleteOpen}
						setIsDeleteOpen={setIsDeleteOpen}
					/>
				</div>
				<AddScheduleModal
					defaultDate={modalDate}
					timeIndex={timeIndex}
					isOpen={isOpenModal}
					setIsOpen={setIsOpenModal}
				/>
			</main>
		</>
	)
}
