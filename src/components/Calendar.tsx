'use client'

import Header from '../components/Header'
// import SideCalendar from '../components/SideCalendar'
// import SideCalendarTitle from '../components/SideCalendarTitle'
import { useSelector } from 'react-redux'
import { currentCalendar } from '../store/calendar'
import ScheduleCalendar from '../components/ScheduleCalendar'
import getThisWeek from '@/app/util/getThisWeek'
import { useState } from 'react'
import AddScheduleButton from '@/components/AddScheduleButton'
import AddScheduleModal from '../components/AddScheduleModal'
import formatDay from '@/app/util/formatDay'
import Nav from '@/components/Nav'
import AddActivityModal from './AddActivityModal'
import EditActivityModal from './EditActivityModal'

export default function Calendar() {
	const { year, month, days } = useSelector(currentCalendar)
	const [isSideCalendar, setIsSideCalendar] = useState<boolean>(false)
	const [isOpenModal, setIsOpenModal] = useState<boolean>(true)
	const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
	const [modalDate, setModalDate] = useState<string>(formatDay(new Date()))
	const [timeIndex, setTimeIndex] = useState<number>(0)
	const [month2, setMonth2] = useState<string>('')
	const [isOpenModal2, setIsOpenModal2] = useState<boolean>(false)
	const [isOpenModal3, setIsOpenModal3] = useState<boolean>(false)

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
				<div className={`p-5 flex flex-col mt-[65px] w-[200px] ${isSideCalendar ? 'block' : 'hidden'}`}>
					{/* <SideCalendarTitle year={year} month={month} />
					<SideCalendar days={days} /> */}
					{/* PUT LINKS HERE */}
				</div>
				<div className="flex flex-col h-full overflow-x-scroll flex-1 pr-2">
					<ScheduleCalendar
						days={getThisWeek(days)}
						setModalDate={setModalDate}
						setTimeIndex={setTimeIndex}
						setIsOpenModal={setIsOpenModal}
						isDeleteOpen={isDeleteOpen}
						setIsDeleteOpen={setIsDeleteOpen}
						year={year}
						month={month}
						isSideCalendar={isSideCalendar}
						setIsSideCalendar={setIsSideCalendar}
						isOpenModal={isOpenModal}
						setIsOpenModal2={setIsOpenModal2}
						isOpenModal2={isOpenModal2}
						setIsOpenModal3={setIsOpenModal3}
						isOpenModal3={isOpenModal3}
					/>
				</div>

				{/* GENERATE INTINERARY TO HINDI ADD SCHEDULE */}
				<AddScheduleModal
					defaultDate={modalDate}
					timeIndex={timeIndex}
					isOpen={isOpenModal}
					setIsOpen={setIsOpenModal}
				/>

				<AddActivityModal
					isOpen={isOpenModal2}
					setIsOpen={setIsOpenModal2}
				/>

				<EditActivityModal
					isOpen={isOpenModal3}
					setIsOpen={setIsOpenModal3}
				/>
			</main>
		</>
	)
}
