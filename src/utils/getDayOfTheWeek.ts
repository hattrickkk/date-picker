export const getDayOfTheWeek = (year: number, month: number, day: number) => {
    return new Date(year, month, day).getDay()
}
