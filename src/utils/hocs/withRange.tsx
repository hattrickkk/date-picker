import React, { createContext, useMemo, ComponentType, ReactElement, useState } from 'react'

import { DateType } from '@customTypes/date'
import { DatePickerService } from '@utils/DatePickerService'

type WithRangeContextType = {
    rangeStart: DateType | null
    setRangeStart: React.Dispatch<React.SetStateAction<DateType | null>>
    rangeEnd: DateType | null
    setRangeEnd: React.Dispatch<React.SetStateAction<DateType | null>>
}

export const WithRangeContext = createContext<WithRangeContextType>({} as WithRangeContextType)

export const withRange = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return (props: P): ReactElement => {
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
                <WrappedComponent {...props} />
            </WithRangeContext.Provider>
        )
    }
}
