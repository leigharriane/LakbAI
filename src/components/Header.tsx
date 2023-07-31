import { useDispatch } from 'react-redux'
import { lastWeek, nextWeek, selectDay } from '@/store/calendar'
import { Dispatch, SetStateAction } from 'react'

export default function Header({
  year,
  month,
  isSideCalendar,
  setIsSideCalendar,
}: {
  year: number
  month: number
  isSideCalendar: boolean
  setIsSideCalendar: Dispatch<SetStateAction<boolean>>
}) {
  const dispatch = useDispatch()
  return (
    <header className="flex items-center px-2 w-full h-14 border-b border-gray-300 text-white">
      <div className="flex items-center">
        <div
          className="flex items-center p-2 rounded-full hover:bg-slate-100 cursor-pointer"
          onClick={() => setIsSideCalendar(!isSideCalendar)}
        >
          <img src="/menu.svg" alt="menu" width={24} height={24} />
        </div>

        {/* <div className="flex items-center ml-3">
          <img src="/calendar.svg" alt="logo" width={30} height={30} />
          <h1 className="ml-2 text-lg text-gray-500 hidden md:block">Calendar</h1>
        </div> */}
      </div>
      <p className='font-bold text-[#5B8CEC] text-[20px] sm:text-[32px] flex self-center w-full justify-center'>LakbAI</p>

      {/* <span className="px-3 py-1 mx-3 border border-gray-200 rounded text-sm">:D</span> */}
    </header>
  )
}
