import { getCurrent } from './getCurrent'

export const getMonthForDatePicker = (min: number, max: number) => {
    const currentYear = getCurrent()[1]
    const currentMonth = getCurrent()[0]

    if (currentYear <= min || currentYear >= max) {
        return 0
    }
    return currentMonth
}
