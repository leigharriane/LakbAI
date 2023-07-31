export type tDays = {
  date: number
  dayOfWeek: number
  isToday: boolean
  isSelected: boolean
  isThisWeek: boolean
  isThisMonth: boolean
  day: string
}

export type tHours = {
  text: string
  hour: number
}

export type tTime = { hour: number; minute: number }

export type tRangeColor = '#FF003D' | '#D91BEA' | '#5EE45C' | '#64BFF2' | '#E9A800' | '#AD00FF'
export type tScheduleDetail = { start: tTime; end: tTime; color: tRangeColor; title: string; country: string; city: string; people: number; price: number; detail: string; transporticon: boolean}

export type tSchedule = { [key: string]: Array<tScheduleDetail> }
