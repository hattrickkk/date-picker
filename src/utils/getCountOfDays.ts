export const getCountOfDays = (year: number, month: number, day: number = 0) => {
    return new Date(year, month, day).getDate()
}
