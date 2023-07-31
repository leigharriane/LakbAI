import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import createSelectTimes from '@/app/util/createSelectTimes'
import { useDispatch } from 'react-redux'
import { tRangeColor, tScheduleDetail } from '../../index'
import { addSchedule } from '../store/schedule'

export default function AddScheduleModal({
  defaultDate,
  timeIndex,
  isOpen,
  setIsOpen,
}: {
  defaultDate: string
  timeIndex: number
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const dispatch = useDispatch()
  const [isSelectStartTime, setIsSelectStartTime] = useState<boolean>(false)
  const [isSelectEndTime, setIsSelectEndTime] = useState<boolean>(false)

  const [title, setTitle] = useState<string>('')
  const [date, setDate] = useState<string>('2021-12-31')
  const [color, setColor] = useState<tRangeColor>('#AD00FF')
  const [startHour, setStartHour] = useState<number>(12)
  const [startMinute, setStartMinute] = useState<number>(12)
  const [endHour, setEndHour] = useState<number>(0)
  const [endMinute, setEndMinute] = useState<number>(0)
  const [city, setCity] = useState<string>('')
  const [people, setPeople] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)
  const [detail, setDetail] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [transporticon, setTrasportIcon] = useState<boolean>(false)

  const [startSelectTimeIndex, setStartSelectTimeIndex] = useState<number>(0)
  const [endSelectTimeIndex, setEndSelectTimeIndex] = useState<number>(-1)

  const [displayStartTime, setDisplayStartTime] = useState<string>('')
  const [displayEndTime, setDisplayEndTime] = useState<string>('')

  const selectTimes: Array<{ hour: number; minute: string; text: string }> = createSelectTimes()
  const colors: tRangeColor[] = ['#FF003D', '#D91BEA', '#5EE45C', '#64BFF2', '#E9A800', '#AD00FF']

  const startTimeChange = (hour: number, minute: string, text: string, index: number) => {
    if (endSelectTimeIndex < index) {
      endTimeChange(hour, minute, text, index)
    }
    setStartSelectTimeIndex(index)
    setIsSelectStartTime(false)
    setDisplayStartTime(text)
    setStartHour(hour)
    setStartMinute(parseInt(minute))
  }

  const endTimeChange = (hour: number, minute: string, text: string, index: number) => {
    setEndSelectTimeIndex(index)
    setIsSelectEndTime(false)
    setDisplayEndTime(text)
    setEndHour(hour)
    setEndMinute(parseInt(minute))
  }

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsOpen(false)
    setTitle('')
    setCity('')
    setCountry('')
    const schedule: { date: string; data: tScheduleDetail } = {
      date: date,
      data: {
        start: { hour: startHour, minute: startMinute },
        end: { hour: endHour, minute: endMinute },
        color: color,
        title: title,
        country: country,
        city: city,
        people: people,
        price: price,
        detail: detail,
        transporticon: transporticon,
      },
    }
    dispatch(addSchedule(schedule))
  }

  useEffect(() => {
    setDate(defaultDate)
    const defaultTime = selectTimes[timeIndex]
    startTimeChange(defaultTime.hour, defaultTime.minute, defaultTime.text, timeIndex)
  }, [defaultDate, timeIndex])

  return (
    <div className={`${isOpen ? 'fixed' : 'hidden'} w-screen h-screen flex flex-row justify-center items-center top-0 bg-fade z-20`}>
      <div
        className={`
        shadow-2xl rounded-lg z-50 top-[150px] left-8 m-auto w-[350px] bg-dark text-white flex flex-col`}
      >
        <div className="w-full mb-3 py-1 px-3 bg-gray-200 rounded-t-lg">
          <svg
            className="ml-auto cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 0 24 24"
            width="20px"
            fill="#222222"
            onClick={() => setIsOpen(false)}
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </div>
        <form className="py-3 px-5 w-full flex flex-col gap-[15px]" onSubmit={submitHandle}>
          <div className="flex mt-3 gap-[10px] relative items-center">
            <div className='flex flex-col gap-[4px]'>
              <p className='text-xs'>Start Date</p>
              <input
                type="date"
                value={date}
                className="w-[150px] outline-none bg-white text-black px-2 rounded-[6px]"
                onChange={e => {
                  // setDate(e.target.value)
                }}
              />
            </div>
            <div className='flex flex-col gap-[4px]'>
              <p className='text-xs'>End Date</p>
              <input
                type="date"
                value={date}
                className="w-[150px] outline-none bg-white text-black px-2 rounded-[8px]"
                onChange={e => {
                  // setDate(e.target.value)
                }}
              />
            </div>
          </div>
          <div className='flex flex-col gap-[4px]'>
            <p className='text-xs'>Country</p>
            <input
              type="text"
              className="w-full outline-none bg-white text-black px-2 rounded-[8px]"
              placeholder="Name"
              value={title}
              // onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div className='flex flex-col gap-[4px]'>
            <p className='text-xs'>City</p>
            <input
              type="text"
              className="w-full outline-none bg-white text-black px-2 rounded-[8px]"
              placeholder="City"
              value={city}
              // onChange={e => setCity(e.target.value)}
              required
            />
          </div>

          <div className="flex mt-3 gap-[10px] relative items-center">
            <div className='flex flex-col gap-[4px]'>
              <p className='text-xs'>Number of Companions</p>
              <input
                type="number"
                className="w-[150px] outline-none bg-white text-black px-2 rounded-[6px]"
                placeholder="Number of People"
                value={people}
                // onChange={e => setPeople(e.target.valueAsNumber)}
                required
              />
            </div>
            <div className='flex flex-col gap-[4px]'>
              <p className='text-xs'>Overall Budget</p>

              <input
                type="number"
                className="w-[150px] outline-none bg-white text-black px-2 rounded-[8px]"
                placeholder="Price"
                value={price}
                // onChange={e => setPrice(e.target.valueAsNumber)}
                required
              />
            </div>
          </div>



          {/* <div className='flex relative items-center'>
            {isSelectStartTime && (
              <div className="absolute top-[30px] left-[0px] w-[180px] h-[180px] rounded-md bg-dark shadow flex flex-col overflow-y-auto z-20">
                {selectTimes.map((time, index) => (
                  <div
                    className="p-2 text-sm cursor-pointer hover:bg-gray-700"
                    key={time.text}
                    onClick={() => startTimeChange(time.hour, time.minute, time.text, index)}
                  >
                    {time.text}
                  </div>
                ))}
              </div>
            )}
            <span
              className="ml-3 mr-2 w-[50px] cursor-pointer p-1"
              onClick={() => {
                setIsSelectStartTime(true)
                setIsSelectEndTime(false)
              }}
            >
              {displayStartTime}
            </span>
            -
            {isSelectEndTime && (
              <div className="absolute top-[30px] left-[80px] w-[180px] h-[180px] rounded-md bg-dark shadow flex flex-col overflow-y-auto z-20">
                {selectTimes.slice(startSelectTimeIndex).map((time, index) => (
                  <div
                    className="p-2 text-sm cursor-pointer hover:bg-gray-700"
                    key={time.text}
                    onClick={() => endTimeChange(time.hour, time.minute, time.text, index)}
                  >
                    {time.text}
                  </div>
                ))}
              </div>
            )}
            <span
              className="ml-2 w-[90px] cursor-pointer p-1"
              onClick={() => {
                setIsSelectEndTime(true)
                setIsSelectStartTime(false)
              }}
            >
              {displayEndTime}
            </span>
          </div> */}
          <div className="flex mt-5 z-10">
            {colors.map(clr => (
              <div
                key={clr}
                className={`w-6 h-6 rounded-full cursor-pointer mr-2 hover:scale-110
                ${clr === color && 'scale-125'}`}
                style={{ background: clr }}
                onClick={() => setColor(clr)}
              />
            ))}
          </div>
          <div className="w-full mb-3 mt-8 flex">
            <button
              className="ml-auto bg-blue-500 text-white px-5 py-1 text-sm rounded hover:bg-blue-700"
              type="submit"
            >
              Done
            </button>
          </div>
        </form>
      </div>
    </div>

  )
}
