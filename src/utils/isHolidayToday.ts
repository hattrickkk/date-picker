import { DateType } from '@customTypes/date'
import { Holiday } from '@customTypes/holidays'

export const isHolidayToday = (date: DateType, holidays: Holiday[]) => {
    return !!holidays.find(({ month, day }) => month === date.month && day === date.day)
}
