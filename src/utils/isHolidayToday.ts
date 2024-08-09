import { Holiday } from '@customTypes/holidays'

export const isHolidayToday = (m: number, d: number, holidays: Holiday[]) => {
    return !!holidays.find(({ month, day }) => month === m && day === d)
}
