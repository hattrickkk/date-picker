import React, { createContext, useMemo, ComponentType, ReactElement } from 'react'

import { Holiday } from '@customTypes/holidays'
import { DatePickerService } from '@utils/DatePickerService'
import { useHolidays } from '@utils/hooks/useHolidays'

type HocProps = {
    holidaysColor: string
    holidays: Holiday[]
    hideHolidays: boolean
}

type WithHolidaysContextType = {
    datePickerService: DatePickerService
}

export const WithHolidaysContext = createContext<WithHolidaysContextType>({} as WithHolidaysContextType)

export const withHolidays = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return ({ hideHolidays, holidaysColor, ...props }: P & HocProps): ReactElement => {
        const datePickerService = new DatePickerService()
        datePickerService.setHolidays(useHolidays())
        datePickerService.setHolidaysColor(holidaysColor)
        datePickerService.setHideHolidays(hideHolidays)

        const value = useMemo(() => {
            return { datePickerService }
        }, [datePickerService])

        return (
            <WithHolidaysContext.Provider value={value}>
                <WrappedComponent {...(props as P)} />
            </WithHolidaysContext.Provider>
        )
    }
}
