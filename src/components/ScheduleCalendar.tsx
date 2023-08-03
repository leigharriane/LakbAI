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
	isOpenModal2,
	setIsOpenModal2,
	isOpenModal3,
	setIsOpenModal3,
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
	isOpenModal2: boolean
	setIsOpenModal2: Dispatch<SetStateAction<boolean>>
	isOpenModal3: boolean
	setIsOpenModal3: Dispatch<SetStateAction<boolean>>
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
			<div className="overflow-auto w-full flex px-6 py-4 flex-col mb-2 text-white font-sf" id="schedule">
				<div className="flex items-center self-center justify-between w-full text-white">
					<div className='title-place ml-10'>Paris, France 3-Day Itinerary</div>
					<div className='flex flex-row gap-[10px]'>
						<button
							className={`bg-[#69636A] shadow-md py-1 px-4 flex clex-row gap-[5px]
           rounded-full hover:shadow-xl items-center 
          ${!isSideCalendar && 'block'}`}
							onClick={() => setIsOpenModal2(!isOpenModal2)}
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
														<div className='flex flex-col opacity-100 font-medium'>
															<div className='font-bold'>{s.title}</div>
															<div className=''>{s.country}, {s.city}</div>
															<div className='flex flex-row flex-wrap gap-[4px]'>
																<div className='rounded-full text-[#212121] px-2' style={{ background: `${s.color}` }}>{s.detail}</div>
																<div className='rounded-full text-[#212121] px-2' style={{ background: `${s.color}` }}>{s.people}</div>
																<div className='rounded-full text-[#212121] px-2' style={{ background: `${s.color}` }}>P{s.price}</div>
																{s.transporticon == true ? <svg xmlns="http://www.w3.org/2000/svg" width="30" height="18" viewBox="0 0 41 24" fill="none">
																	<path d="M32.2086 7.11808L27.4233 2.04805C27.1076 1.71542 26.7329 1.45165 26.3205 1.27183C25.9082 1.092 25.4663 0.999631 25.0201 1H11.5431C10.912 0.999525 10.2933 1.18449 9.75634 1.53415C9.21935 1.88382 8.78533 2.38435 8.50293 2.97964L6.40538 7.4092C6.17007 7.90721 6.04795 8.45619 6.04871 9.01262V15.3322C6.04871 16.2825 6.40659 17.1939 7.04362 17.8659C7.68065 18.5378 8.54465 18.9153 9.44555 18.9153H36.6203C37.5212 18.9153 38.3852 18.5378 39.0222 17.8659C39.6592 17.1939 40.0171 16.2825 40.0171 15.3322V11.7492C40.0171 10.7989 39.6592 9.88753 39.0222 9.21558C38.3852 8.54363 37.5212 8.16612 36.6203 8.16612H34.6289C34.1798 8.16886 33.7347 8.07764 33.3193 7.89774C32.9038 7.71785 32.5263 7.45285 32.2086 7.11808V7.11808Z" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
																	<path d="M14.1288 23C16.2393 23 17.9503 21.1953 17.9503 18.9691C17.9503 16.7428 16.2393 14.9381 14.1288 14.9381C12.0183 14.9381 10.3074 16.7428 10.3074 18.9691C10.3074 21.1953 12.0183 23 14.1288 23Z" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
																	<path d="M31.1136 23C33.2241 23 34.935 21.1953 34.935 18.9691C34.935 16.7428 33.2241 14.9381 31.1136 14.9381C29.003 14.9381 27.2921 16.7428 27.2921 18.9691C27.2921 21.1953 29.003 23 31.1136 23Z" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
																	<path d="M21.9838 12.0135H23.6823M39.9319 13.4512H38.9723C38.7916 13.4524 38.6125 13.416 38.4452 13.3442C38.2778 13.2723 38.1256 13.1664 37.997 13.0325C37.8685 12.8986 37.7662 12.7393 37.6961 12.5637C37.6259 12.388 37.5892 12.1996 37.5881 12.009C37.5892 11.8184 37.6259 11.63 37.6961 11.4544C37.7662 11.2787 37.8685 11.1194 37.997 10.9855C38.1256 10.8516 38.2778 10.7457 38.4452 10.6738C38.6125 10.602 38.7916 10.5656 38.9723 10.5668H39.6644M21.6654 23H36.7049M6.22675 23H18.7017M4.15044 23H4.49437M3.72583 13.8185H5.84886M4.99965 14.9382H5.84886M28.5992 8.21992H22.4085C22.2958 8.21992 22.1878 8.17273 22.1082 8.08874C22.0286 8.00474 21.9838 7.89082 21.9838 7.77203V4.63686C21.9838 4.51807 22.0286 4.40415 22.1082 4.32015C22.1878 4.23616 22.2958 4.18897 22.4085 4.18897H25.627C25.6828 4.18863 25.7382 4.19993 25.79 4.22222C25.8417 4.24451 25.8888 4.27735 25.9284 4.31886L28.9007 7.45404C28.9605 7.51668 29.0014 7.59672 29.018 7.68394C29.0346 7.77117 29.0262 7.86163 28.9938 7.94379C28.9615 8.02595 28.9067 8.09609 28.8364 8.14527C28.7661 8.19445 28.6835 8.22043 28.5992 8.21992V8.21992ZM10.3879 8.21992H18.5828C18.6954 8.21992 18.8034 8.17273 18.883 8.08874C18.9626 8.00474 19.0074 7.89082 19.0074 7.77203V4.63686C19.0074 4.51807 18.9626 4.40415 18.883 4.32015C18.8034 4.23616 18.6954 4.18897 18.5828 4.18897H12.0396C11.9644 4.18911 11.8905 4.21033 11.8256 4.25047C11.7607 4.2906 11.7071 4.34821 11.6702 4.41739L10.0185 7.55257C9.98219 7.62067 9.96342 7.69759 9.96402 7.77571C9.96463 7.85382 9.9846 7.93041 10.0219 7.99787C10.0593 8.06533 10.1127 8.12132 10.1769 8.16027C10.2411 8.19922 10.3138 8.21978 10.3879 8.21992Z" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
																	<g opacity="0.2">
																		<path d="M2.06151 7.06433V9.30374M3.12303 8.18404H1" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
																	</g>
																	<g opacity="0.2">
																		<path d="M35.9291 2.80957V5.04898M36.9906 3.92928H34.8676" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
																	</g>
																</svg> : ''}
															</div>
														</div>
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
				<div className='fixed text-[12px] px-6 py-2 shadow rounded z-10 bg-dark cursor-pointer text-white flex flex-col gap-2'
					style={{ top: `${deleteBox.top}px`, left: `${deleteBox.left}px` }}>
					<div
						onClick={() => deleteHandle()}
					>
						Delete
					</div>
					<div
						onClick={() => setIsOpenModal3(!isOpenModal3)}
					>
						Edit
					</div>
				</div>
			)}
		</>
	)
}
