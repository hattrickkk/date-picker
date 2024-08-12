import { DateType } from '@customTypes/date'

export const isEqual = (range: DateType, year: number, month: number, day: number) => {
    return range.day === day && range.month === month && range.year === year
}
