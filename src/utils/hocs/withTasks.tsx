import React, { createContext, useMemo, ComponentType, ReactElement } from 'react'

import { DatePickerService } from '@utils/datePickerService'
import { getTasksFromLocalStorage } from '@utils/getTasksFromLocalStorage'

type WithTasksContextType = {
    tasksPickerService: DatePickerService
}

export const WithTasksContext = createContext<WithTasksContextType>({} as WithTasksContextType)

export const withTasks = <P extends object>(Component: ComponentType<P>) => {
    return (props: P): ReactElement => {
        const tasksPickerService = new DatePickerService()
        tasksPickerService.setTasks(getTasksFromLocalStorage())

        const value = useMemo(() => {
            return { tasksPickerService }
        }, [tasksPickerService])
        return (
            <WithTasksContext.Provider value={value}>
                <Component {...props} isTaskPicker />
            </WithTasksContext.Provider>
        )
    }
}
