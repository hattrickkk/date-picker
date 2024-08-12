import { getCurrent } from './getCurrent'

export const getYearForDatePicker = (min: number, max: number) => {
    const currentYear = getCurrent()[1]
    if (currentYear <= min) {
        return min
    }
    if (currentYear >= max) {
        return max
    }
    return currentYear
}
