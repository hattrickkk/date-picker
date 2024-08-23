import React, { createContext, useMemo, ComponentType, ReactElement, useState } from 'react'

import { HOLIDAYS_COLOR } from '@constants/colors'
import { Common } from '@customTypes/common'
import { DateType } from '@customTypes/date'

type WithRangeContextType = {
    rangeStart: DateType | null
    setRangeStart: React.Dispatch<React.SetStateAction<DateType | null>>
    rangeEnd: DateType | null
    setRangeEnd: React.Dispatch<React.SetStateAction<DateType | null>>
}

export const WithRangeContext = createContext<WithRangeContextType>({} as WithRangeContextType)

export const withRange = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return ({
        minYear = 0,
        maxYear = 2300,
        holidaysColor = HOLIDAYS_COLOR,
        hideHolidays = false,
        weekStarts = 'Sunday',
        isHighlightWeekends = false,
        ...props
    }: P & Common): ReactElement => {
        const [rangeStart, setRangeStart] = useState<DateType | null>(null)
        const [rangeEnd, setRangeEnd] = useState<DateType | null>(null)

        const value = useMemo(() => {
            return {
                rangeStart,
                rangeEnd,
                setRangeStart,
                setRangeEnd,
            }
        }, [rangeStart, rangeEnd])

        return (
            <WithRangeContext.Provider value={value}>
                <WrappedComponent
                    {...(props as P)}
                    isTaskPicker
                    minYear={minYear}
                    maxYear={maxYear}
                    weekStarts={weekStarts}
                    hideHolidays={hideHolidays}
                    holidaysColor={holidaysColor}
                    isHighlightWeekends={isHighlightWeekends}
                />
            </WithRangeContext.Provider>
        )
    }
}
