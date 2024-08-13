import { useEffect } from 'react'

import { TASKS_KEY } from '@constants/magicValues'
import { Task } from '@customTypes/task'
import { DatePickerService } from '@utils/DatePickerService'
import { getTasksFromLocalStorage } from '@utils/getTasksFromLocalStorage'

export const useSetTasksToLocalstorage = (tasks: Task[], date: string, tasksPickerService: DatePickerService) => {
    useEffect(() => {
        if (tasks.length) {
            const items = {
                ...getTasksFromLocalStorage(),
                [date]: {
                    tasks,
                },
            }
            tasksPickerService.setTasks(items)
            localStorage.setItem(TASKS_KEY, JSON.stringify(items))
        } else {
            const datesWithTasks = Object.keys(tasksPickerService.getTasks())
            if (datesWithTasks.includes(date)) {
                const items = {
                    ...getTasksFromLocalStorage(),
                }
                delete items[date]
                tasksPickerService.setTasks(items)
                localStorage.setItem(TASKS_KEY, JSON.stringify(items))
            }
        }
    }, [tasks])
}
