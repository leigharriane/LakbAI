import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import createSelectTimes from '@/app/util/createSelectTimes'
import { useDispatch } from 'react-redux'
import { tRangeColor, tScheduleDetail } from '../../index'
import { addSchedule } from '../store/schedule'

export default function AddActivityModal({ }) {


	return (
		<div className={`${isOpen ? 'fixed' : 'hidden'} w-screen h-screen flex flex-row justify-center items-center top-0 bg-fade z-20`}>
			<div
				className={`
        shadow-2xl rounded-lg z-50 top-[150px] left-8 m-auto w-[350px] bg-dark text-white flex flex-col`}
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
					<div className="flex mt-3 gap-[10px] relative items-center">
						<div className='flex flex-col gap-[4px]'>
							<p className='text-xs'>Start Date</p>
							<input
								type="date"
								value={'1-2-2023'}
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
								value={'1-2-2023'}
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
							value={'hi'}
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
							value={'hi'}
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
								value={'12'}
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
								value={'12'}
								// onChange={e => setPrice(e.target.valueAsNumber)}
								required
							/>
						</div>
					</div>





					<div className="w-full mb-3 mt-8 flex">
						<button
							className="w-full bg-blue-500 text-white px-5 py-2 text-sm rounded hover:bg-blue-700"
							type="submit"
						>
							Generate Itinerary
						</button>
					</div>
				</form>
			</div>
		</div>

	)
}
