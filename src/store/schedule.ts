import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { tSchedule, tScheduleDetail } from '../../index'
import { RootState } from './index'

//Initial Schedule
const initialState: tSchedule = {
  '2023-07-31': [
    {
      start: { hour: 1, minute: 20 },
      end: { hour: 5, minute: 40 },
      color: '#AD00FF',
      title: 'Louvre Museum',
      country: 'France',
      city: 'Paris',
      people: 10,
      price: 9000,
      detail: 'Taxi (15 mins)',
      transporticon: true,
    },
  ],
}

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    addSchedule: (state, action: PayloadAction<{ date: string; data: tScheduleDetail }>) => {
      if (!state[action.payload.date]) {
        state[action.payload.date] = []
      }
      state[action.payload.date] = [...state[action.payload.date], action.payload.data]
    },
    removeSchedule: (state, action: PayloadAction<{ date: string; index: number }>) => {
      delete state[action.payload.date][action.payload.index]
    },
  },
})

export const { addSchedule, removeSchedule } = scheduleSlice.actions
export const schedules = (state: RootState) => state.schedule

export default scheduleSlice.reducer
