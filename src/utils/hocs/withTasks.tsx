import React, { createContext, useMemo, ComponentType, ReactElement } from 'react'

import { TaskModal } from '@components/taskModal'
import { HOLIDAYS_COLOR } from '@constants/colors'
import { Common } from '@customTypes/common'
import { DatePickerService } from '@utils/datePickerService'
import { getTasksFromLocalStorage } from '@utils/getTasksFromLocalStorage'

type WithTasksContextType = {
    tasksPickerService: DatePickerService
}

export const WithTasksContext = createContext<WithTasksContextType>({} as WithTasksContextType)

export const withTasks = <P extends object>(Component: ComponentType<P>) => {
    return ({
        minYear = 0,
        maxYear = 2300,
        holidaysColor = HOLIDAYS_COLOR,
        hideHolidays = false,
        weekStarts = 'Sunday',
        isHighlightWeekends = false,
        ...props
    }: P & Common): ReactElement => {
        const tasksPickerService = new DatePickerService()
        tasksPickerService.setTasks(getTasksFromLocalStorage())

        const value = useMemo(() => {
            return { tasksPickerService }
        }, [tasksPickerService])
        return (
            <WithTasksContext.Provider value={value}>
                <Component
                    {...(props as P)}
                    isTaskPicker
                    minYear={minYear}
                    maxYear={maxYear}
                    weekStarts={weekStarts}
                    hideHolidays={hideHolidays}
                    holidaysColor={holidaysColor}
                    isHighlightWeekends={isHighlightWeekends}
                />
            </WithTasksContext.Provider>
        )
    }
}
