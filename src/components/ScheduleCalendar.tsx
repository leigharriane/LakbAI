import { tDays } from '../../index'
import { dayOfWeek } from '@/app/util/dayOfWeek'
import { hours24 } from '@/app/util/HoursAday'
import { removeSchedule, schedules } from '../store/schedule'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, SetStateAction, useEffect, useState } from 'react'
import { lastWeek, nextWeek, selectDay } from '@/store/calendar'

export default function ScheduleCalendar({
	days,
	setModalDate,
	setTimeIndex,
	setIsOpenModal,
	isDeleteOpen,
	setIsDeleteOpen,
	year,
	month,
	isSideCalendar,
	setIsSideCalendar,
	isOpenModal,
}: {
	days: tDays[]
	setModalDate: Dispatch<SetStateAction<string>>
	setTimeIndex: Dispatch<SetStateAction<number>>
	setIsOpenModal: Dispatch<SetStateAction<boolean>>
	isDeleteOpen: boolean
	setIsDeleteOpen: Dispatch<SetStateAction<boolean>>
	year: number
	month: number
	isSideCalendar: boolean
	setIsSideCalendar: Dispatch<SetStateAction<boolean>>
	isOpenModal: boolean
}) {
	const dispatch = useDispatch()
	const scheduleData = useSelector(schedules)
	const [deleteBox, setDeleteBox] = useState<{ top: number; left: number }>({ top: 100, left: 100 })
	const [deleteSchedule, setDeleteSchedule] = useState<{ date: string; index: number }>({
		date: '',
		index: 0,
	})

	const modalHandle = (date: string, hour: number) => {
		setModalDate(date)
		setTimeIndex(hour)
		setIsOpenModal(true)
		setIsDeleteOpen(false)
	}

	const scheduleHandle = (
		cursor: { top: number; left: number },
		scheduleData: { date: string; index: number }
	) => {
		setIsOpenModal(false)
		setIsDeleteOpen(true)
		setDeleteBox(cursor)
		setDeleteSchedule(scheduleData)
	}

	const deleteHandle = () => {
		setIsDeleteOpen(false)
		dispatch(removeSchedule({ date: deleteSchedule.date, index: deleteSchedule.index }))
	}

	useEffect(() => {
		if (isDeleteOpen) {
			document.getElementById('schedule')!.style.overflow = 'hidden'
		} else {
			document.getElementById('schedule')!.style.overflow = 'auto'
		}
	}, [isDeleteOpen])

	return (
		<>
			<div className="overflow-auto w-full flex px-6 py-4 flex-col mb-2 text-white" id="schedule">
				<div className="flex items-center self-center justify-between w-full text-white">
					<div className='title-place ml-10'>Paris, France 3-Day Itinerary</div>
					<div className='flex flex-row gap-[10px]'>
						<button
							className={`bg-[#69636A] shadow-md py-1 px-4 flex clex-row gap-[5px]
           rounded-full hover:shadow-xl items-center 
          ${!isSideCalendar && 'block'}`}
							onClick={() => setIsOpenModal(!isOpenModal)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="20px"
								viewBox="0 0 24 24"
								width="20px"
								fill="#ffffff"
							>
								<path d="M0 0h24v24H0V0z" fill="none" />
								<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
							</svg>
							<span className="">Add</span>
						</button>
						<button
							className={`bg-[#2260D8] shadow-md py-1 px-4 flex clex-row gap-[5px]
           rounded-full hover:shadow-xl items-center 
          ${!isSideCalendar && 'block'}`}
							onClick={() => setIsOpenModal(!isOpenModal)}
						>
							<p> ✨ </p>
							<span className="">AI Autofill</span>
						</button>
					</div>

					<div className='flex flex-row'>
						<button
							className="px-3 py-1 mx-3 border border-gray-200 rounded text-sm"
							onClick={() => dispatch(selectDay(new Date().toString()))}
						>
							Today
						</button>
						<img
							src="/left.svg"
							alt="logo"
							width={26}
							height={26}
							className="cursor-pointer"
							onClick={() => dispatch(lastWeek())}
						/>
						<img
							src="/right.svg"
							alt="logo"
							width={26}
							height={26}
							className="cursor-pointer"
							onClick={() => dispatch(nextWeek())}
						/>
						<span className="text-sm md:text-lg ml-3">
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
					</div>
				</div>
				<div className="flex flex-col flex-1">
					<div className="sticky top-0 flex bg-dark z-20">
						<div className="min-w-[70px] w-[70px] bg-dark" />
						{days.map((day, index) => (
							<div className="flex-1 min-w-[81px] flex flex-col  bg-dark z-20 pt-4" key={day.date}>
								<div className="text-center font-light text-sm">{dayOfWeek[index]}</div>
								<div className="text-center font-light text-2xl p-1">
									<div
										className={`w-10 h-10 rounded-full m-auto flex justify-center items-center
                      ${day.isToday && 'bg-blue-500 text-white'}`}
									>
										{day.date}
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="flex flex-1">
						<div className="bg-dark sticky left-0 top-0 w-20 min-w-[70px] z-10">
							{hours24.map(hour => (
								<div className="font-light text-[12px] h-[60px] text-right pr-2" key={hour.text}>
									{hour.text}
								</div>
							))}
						</div>
						<div className="flex flex-1 pt-2">
							{days.map(day => (
								<div
									className="flex-1 min-w-[81px] flex flex-col relative"
									key={`scheduleline${day.day}`}
								>
									{hours24.map((hour, index) => (
										<div
											key={`schedule${hour.text}`}
											className="border border-solid bg-[#313131] border-transparent border-r-[#212121] border-r-[2px] border-t-[#4F4F4F] h-[60px]"
											onClick={() => modalHandle(day.day, index * 4)}
										/>
									))}
									{scheduleData[day.day] && (
										<>
											{scheduleData[day.day].map((s: any, idx: any) => {
												if (!s || !s.start) {
													return null;
												}
												const t = s.start.hour * 60 + s.start.minute
												const top = `${t}px`
												let h = (s.end.hour - s.start.hour) * 60 - s.start.minute + s.end.minute
												if (h < 20) h = 20
												const height = `${h}px`
												return (
													<div
														key={idx}
														className={`scheduleBox absolute left-0 w-11/12 p-[2px] text-[12px] font-light text-white overflow-y-hidden cursor-pointer`}
														style={{ top: top, height: height, borderLeft: `2px solid ${s.color}` }}
														data-schedule={{ date: day.day, index: idx }}
														onClick={e => {
															scheduleHandle(
																{ top: e.clientY, left: e.clientX },
																{ date: day.day, index: idx }
															)
														}}
													>
														<div className={`w-full h-full opacity-25 absolute overflow-hidden`}
															style={{ background: s.color }}></div>
														<div className='opacity-100'>{s.title}</div>

													</div>
												)
											})}
										</>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			{isDeleteOpen && (
				<div
					className="fixed text-[12px] px-6 py-2 shadow rounded z-10 bg-dark cursor-pointer text-white"
					style={{ top: `${deleteBox.top}px`, left: `${deleteBox.left}px` }}
					onClick={() => deleteHandle()}
				>
					Delete
				</div>
			)}
		</>
	)
}
