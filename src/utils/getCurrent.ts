import MONTHS from '@constants/month'

const getCurrent = (): number[] => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    return [month, year, day]
}

export default getCurrent
