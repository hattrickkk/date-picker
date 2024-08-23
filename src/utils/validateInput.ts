import { validateYear } from './validateYear'

export const validateInput = (inputValue: string, maxYear: number, minYear: number) => {
    const [day, month, year] = inputValue.split('/').map(Number)
    const date = new Date(year, month - 1, day)
    const isValid = date.getMonth() === month - 1 && date.getDate() === day
    const settedYear = validateYear(year, minYear, maxYear)
    return {
        date: [day, month, settedYear],
        isValid,
    }
}
