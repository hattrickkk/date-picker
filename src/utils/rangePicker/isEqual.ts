import { DateType } from '@customTypes/date'

export const isEqual = (range: DateType, { year, month, day }: DateType) => {
    return range.day === day && range.month === month && range.year === year
}
