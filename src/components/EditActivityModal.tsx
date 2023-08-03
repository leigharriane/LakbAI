import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import createSelectTimes from '@/app/util/createSelectTimes'
import { useDispatch } from 'react-redux'
import { tRangeColor, tScheduleDetail } from '../../index'
import { addSchedule } from '../store/schedule'
import Image from 'next/image'

export default function EditActivityModal
	({
		isOpen,
		setIsOpen,
	}: {
		isOpen: boolean
		setIsOpen: Dispatch<SetStateAction<boolean>>
	}) {

	return (
		<div className={`${isOpen ? 'fixed' : 'hidden'} w-screen h-screen flex flex-row justify-center items-center top-0 bg-fade z-20`}>
			<div
				className={`
        shadow-2xl rounded-lg z-50 top-[150px] left-8 m-auto w-[800px] bg-dark text-white flex flex-col`}
			>
				<div className="w-full mb-3 py-1 px-3 bg-dark rounded-t-lg">
					<svg
						className="ml-auto cursor-pointer"
						xmlns="http://www.w3.org/2000/svg"
						height="20px"
						viewBox="0 0 24 24"
						width="20px"
						fill="#FFFFFF"
						onClick={() => setIsOpen(false)}
					>
						<path d="M0 0h24v24H0V0z" fill="none" />
						<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
					</svg>
				</div>
				<form className="py-3 px-5 w-full flex flex-col gap-[15px]">

					<div className='flex flex-col gap-[4px]'>
						<p className='text-m'>Select Date</p>
						<input
							type="text"
							value={'Seine River'}
							className="w-full outline-none bg-white text-black px-2 rounded-[6px]"
							onChange={e => {
								// setDate(e.target.value)
							}}
						/>
					</div>

					<div className='flex flex-col gap-[4px]'>
						<p className='text-m'>Price</p>
						<input
							type="text"
							value={'P500'}
							className="w-full outline-none bg-white text-black px-2 rounded-[6px]"
							onChange={e => {
								// setDate(e.target.value)
							}}
						/>
					</div>

					<div className="w-full mb-3 mt-8 flex">
						<button
							className="w-full bg-blue-500 text-white px-5 py-2 text-sm rounded hover:bg-blue-700"
						// type="submit"
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>

	)
}
