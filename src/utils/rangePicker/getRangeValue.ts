import { DateType } from '@customTypes/date'

import { isEqual } from './isEqual'

export const getRangeValue = (
    start: DateType | null,
    end: DateType | null,
    year: number,
    month: number,
    day: number
) => {
    if (start && !end && isEqual(start, year, month, day)) return 'start'
    if (!start && end && isEqual(end, year, month, day)) return 'end'

    if (start && end) {
        const startEqual = isEqual(start, year, month, day)
        const endEqual = isEqual(end, year, month, day)
        const startDate = new Date(start.year, start.month, start.day)
        const endDate = new Date(end.year, end.month, end.day)
        const currentDate = new Date(year, month, day)

        if (startDate < endDate) {
            if (startEqual) return 'start'
            if (endEqual) return 'end'
            if (currentDate > startDate && currentDate < endDate) return 'middle'
        } else {
            if (startEqual) return 'end'
            if (endEqual) return 'start'
            if (currentDate < startDate && currentDate > endDate) return 'middle'
        }
    }

    return 'none'
}
