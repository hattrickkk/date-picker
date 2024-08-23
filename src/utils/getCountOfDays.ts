import { DateType } from '@customTypes/date'

export const getCountOfDays = ({ year, month, day }: DateType) => {
    return new Date(year, month, day).getDate()
}
