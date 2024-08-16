import React, { createContext, useMemo, ComponentType, ReactElement } from 'react'

import * as colors from '@constants/colors'
import { Holiday } from '@customTypes/holidays'
import { DatePickerService } from '@utils/datePickerService'
import { useHolidays } from '@utils/hooks/useHolidays'

type HocProps = {
    holidaysColor?: string
    holidays?: Holiday[]
    hideHolidays?: boolean
}

type WithHolidaysContextType = {
    datePickerService: DatePickerService
}

export const WithHolidaysContext = createContext<WithHolidaysContextType>({} as WithHolidaysContextType)

export const withHolidays = <P extends object>(WrappedComponent: ComponentType<P>, arr: Holiday[]) => {
    return ({ hideHolidays = false, holidaysColor = colors.HOLIDAYS_COLOR, ...props }: P & HocProps): ReactElement => {
        const datePickerService = new DatePickerService()
        datePickerService.setHolidays(useHolidays(arr))
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
