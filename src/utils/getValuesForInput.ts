import { FIRST_MONTH, LAST_MONTH } from '@constants/magicValues'

export const getValuesForInput = (month: number, year: number, isNext: boolean) => {
    let monthToInput = month + 1
    let yearToInput = year

    if (isNext) {
        if (month === LAST_MONTH) {
            monthToInput = FIRST_MONTH + 1
            yearToInput += 1
        } else {
            monthToInput += 1
        }
    } else if (month === FIRST_MONTH) {
        monthToInput = LAST_MONTH + 1
        yearToInput -= 1
    } else {
        monthToInput -= 1
    }

    return [monthToInput, yearToInput]
}
