export const validateYear = (year: number, minYear: number, maxYear: number) => {
    if (year > maxYear) return maxYear
    if (year <= minYear) return minYear
    return year
}
