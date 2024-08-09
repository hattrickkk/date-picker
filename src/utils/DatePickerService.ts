import * as colors from '@constants/colors'
import { Holiday } from '@customTypes/holidays'

export class DatePickerService {
    private holidays: Holiday[] = []

    private holidaysColor = colors.HOLIDAYS_COLOR

    private hideHolidays = true

    getHolidays() {
        return this.holidays
    }

    setHolidays(value: Holiday[]) {
        this.holidays = value
    }

    getHolidaysColor() {
        return this.holidaysColor
    }

    setHolidaysColor(value: string) {
        this.holidaysColor = value
    }

    getHideHolidays() {
        return this.hideHolidays
    }

    setHideHolidays(value: boolean) {
        this.hideHolidays = value
    }
}
