import * as colors from '@constants/colors'
import { Holiday } from '@customTypes/holidays'
import { Task, Tasks } from '@customTypes/task'

export class DatePickerService {
    private holidays: Holiday[] = []

    private holidaysColor = colors.HOLIDAYS_COLOR

    private hideHolidays = true

    private tasks: Tasks = {}

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

    getTasks() {
        return this.tasks
    }

    getTasksByDate(date: string) {
        return this.tasks[date] ? this.tasks[date].tasks : []
    }

    setTasks(tasks: Tasks) {
        this.tasks = tasks
    }
}
