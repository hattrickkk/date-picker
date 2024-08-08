export const getNumbersFromTo = (from: number, to: number) => {
    const arr = []
    for (let i = from; i <= to; i++) {
        arr.push(i)
    }
    return arr
}
