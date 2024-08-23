import { getCurrent } from './getCurrent'
import { validateYear } from './validateYear'

export const getYearForDatePicker = (min: number, max: number) => {
    const currentYear = getCurrent()[1]
    return validateYear(currentYear, min, max)
}
