export const validateInput = (inputValue: string, maxYear: number, minYear: number) => {
    const [day, month, year] = inputValue.split('/').map(element => +element)
    const date = new Date(year, month - 1, day)
    const isValid = date.getMonth() === month - 1 && date.getDate() === day
    const settedYear = year > maxYear ? maxYear : year <= minYear ? minYear : year
    return {
        date: [day, month, settedYear],
        isValid,
    }
}
