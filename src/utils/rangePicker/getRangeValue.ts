import { DateType } from '@customTypes/date'

import { isEqual } from './isEqual'

export const getRangeValue = (start: DateType | null, end: DateType | null, date: DateType) => {
    if (start && !end && isEqual(start, date)) return 'start'
    if (!start && end && isEqual(end, date)) return 'end'

    if (start && end) {
        const startEqual = isEqual(start, date)
        const endEqual = isEqual(end, date)
        const startDate = new Date(start.year, start.month, start.day)
        const endDate = new Date(end.year, end.month, end.day)
        const currentDate = new Date(date.year, date.month, date.day)

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
