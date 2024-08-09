import { getCurrent } from './getCurrent'

export const getYearForDatePicker = (min: number, max: number) => {
    const currentYear = getCurrent()[1]
    if (currentYear <= min || currentYear >= max) {
        return min
    }
    return currentYear
}
