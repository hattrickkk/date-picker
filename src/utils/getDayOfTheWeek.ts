const getDayOfTheWeek = (year: number, month: number, day: number): number => {
    return new Date(year, month, day).getDay()
}
export default getDayOfTheWeek
