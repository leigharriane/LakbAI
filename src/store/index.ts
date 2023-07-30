import { configureStore } from '@reduxjs/toolkit'
import calendarReducer from './calendar'
import scheduleReducer from './schedule'

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    schedule: scheduleReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
