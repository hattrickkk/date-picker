export const getDateforInput = (day: number, month: number, year: number) => {
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`
}
