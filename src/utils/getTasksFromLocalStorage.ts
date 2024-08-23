import { TASKS_KEY } from '@constants/magicValues'
import { Tasks } from '@customTypes/task'

export const getTasksFromLocalStorage = (): Tasks => {
    const cachedTasks = localStorage.getItem(TASKS_KEY)
    return cachedTasks ? JSON.parse(cachedTasks) : {}
}
