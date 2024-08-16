import { DateType } from '@customTypes/date'

export const getDateforInput = ({ year, month, day }: DateType) => {
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`
}
