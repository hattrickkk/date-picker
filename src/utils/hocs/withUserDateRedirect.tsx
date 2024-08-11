import React, { ComponentType, createContext, ReactElement, useMemo, useState } from 'react'

import { getCurrent } from '@utils/getCurrent'

type Date = {
    day: number
    month: number
    year: number
}

type WithUserDateRedirectContextType = {
    date: Date
    setDate: React.Dispatch<React.SetStateAction<Date>>
}

export const WithUserDateRedirectContext = createContext<WithUserDateRedirectContextType>(
    {} as WithUserDateRedirectContextType
)

export const withUserDateRedirect = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return (props: P): ReactElement => {
        const [month, year, day] = getCurrent()
        const initState = { day, month: month + 1, year }
        const [date, setDate] = useState<Date>(initState)
        const value = useMemo(() => {
            return { date, setDate }
        }, [date])

        return (
            <WithUserDateRedirectContext.Provider value={value}>
                <WrappedComponent {...props} />
            </WithUserDateRedirectContext.Provider>
        )
    }
}
