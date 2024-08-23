import { DateType } from '@customTypes/date'

export const getDayOfTheWeek = ({ year, month, day }: DateType) => {
    return new Date(year, month, day).getDay()
}
