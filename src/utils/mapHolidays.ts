import { LANG } from '@constants/magicValues'
import { Holiday, ResponseHoliday } from '@customTypes/holidays'

export const mapHolidays = (holidays: ResponseHoliday[]): Holiday[] => {
    return holidays.map(({ id, name, startDate }) => {
        return {
            id,
            name: name.find(({ language }) => language === LANG)?.text || '',
            month: +startDate.split('-')[1],
            day: +startDate.split('-')[2],
        }
    })
}
