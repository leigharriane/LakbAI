import { Dispatch, SetStateAction } from 'react'

export default function AddScheduleButton({
  isSideCalendar,
  isOpenModal,
  setIsOpenModal,
}: {
  isSideCalendar: boolean
  isOpenModal: boolean
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div
      className={`fixed z-50 top-[60px] left-0 bg-transparent h-[70px] flex items-center text-white
        ${isSideCalendar ? 'w-[320px] justify-start pl-5' : 'w-[70px] justify-center'}`}
    >
      {/* <button
        className={`border shadow-md bg-dark w-14 h-14 rounded-full hover:shadow-xl
        ${isSideCalendar && 'hidden'}`}
        onClick={() => setIsOpenModal(!isOpenModal)}
      >
        <svg
          className="m-auto"
          xmlns="http://www.w3.org/2000/svg"
          height="36px"
          viewBox="0 0 24 24"
          width="36px"
          fill="#ffffff"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      </button> */}
      {/* <button
        className={`bg-[#69636A] shadow-md py-2 px-4 flex clex-row gap-[10px]
           rounded-full hover:shadow-xl items-center 
          ${!isSideCalendar && 'hidden'}`}
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
      </button> */}
    </div>
  )
}
