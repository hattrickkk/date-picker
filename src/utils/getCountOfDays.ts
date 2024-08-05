const getCountOfDays = (year: number, month: number, day: number = 0): number => {
    return new Date(year, month, day).getDate()
}

export default getCountOfDays
