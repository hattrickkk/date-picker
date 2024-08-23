import { useEffect } from 'react'

import { TASKS_KEY } from '@constants/magicValues'
import { Task, Tasks } from '@customTypes/task'
import { DatePickerService } from '@utils/datePickerService'
import { getTasksFromLocalStorage } from '@utils/getTasksFromLocalStorage'

export const useSetTasksToLocalstorage = (tasks: Task[], date: string, tasksPickerService: DatePickerService) => {
    const updateTasks = (items: Tasks) => {
        tasksPickerService.setTasks(items)
        localStorage.setItem(TASKS_KEY, JSON.stringify(items))
    }

    useEffect(() => {
        const currentTasks = getTasksFromLocalStorage()
        if (tasks.length) {
            updateTasks({
                ...currentTasks,
                [date]: { tasks },
            })
        } else if (currentTasks[date]) {
            const { [date]: _, ...remainingItems } = currentTasks
            updateTasks(remainingItems)
        }
    }, [tasks])
}
