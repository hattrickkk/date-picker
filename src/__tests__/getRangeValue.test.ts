import { DateType } from '@customTypes/date'
import { getCurrent } from '@utils/getCurrent'
import { getRangeValue } from '@utils/rangePicker/getRangeValue'

const start: DateType = {
    day: 5,
    month: 7,
    year: 2024,
}

const end: DateType = {
    day: 10,
    month: 7,
    year: 2024,
}

const [month, year, day] = getCurrent()
const currentRange: DateType = {
    day,
    month,
    year,
}

describe('get valid range value', () => {
    it('with undefined end parameter', () => {
        expect(getRangeValue(start, null, currentRange)).toBe('none')
    })
    it('with undefined start parameter', () => {
        expect(getRangeValue(null, end, currentRange)).toBe('none')
    })
    it('with undefined start and end parameter', () => {
        expect(getRangeValue(null, null, currentRange)).toBe('none')
    })
    it('endRange equal to current year, month, day', () => {
        expect(getRangeValue(null, currentRange, currentRange)).toBe('end')
    })
    it('startRange equal to current year, month, day', () => {
        expect(getRangeValue(currentRange, null, currentRange)).toBe('start')
    })
    it('year, month, day are between the start and end range', () => {
        expect(getRangeValue(start, end, { year: 2024, month: 7, day: 7 })).toBe('middle')
    })
})
