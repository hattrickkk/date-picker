import React, { ComponentType, createContext, ReactElement, useMemo, useState } from 'react'

import { DateType } from '@customTypes/date'

type WithUserDateRedirectContextType = {
    date: DateType | null
    setDate: React.Dispatch<React.SetStateAction<DateType | null>>
    inputValue: string
    setInputValue: React.Dispatch<React.SetStateAction<string>>
}

export const WithUserDateRedirectContext = createContext<WithUserDateRedirectContextType>(
    {} as WithUserDateRedirectContextType
)

export const withUserDateRedirect = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return (props: P): ReactElement => {
        const [date, setDate] = useState<DateType | null>(null)
        const [inputValue, setInputValue] = useState('')

        const value = useMemo(() => {
            return { date, setDate, inputValue, setInputValue }
        }, [date, inputValue])

        return (
            <WithUserDateRedirectContext.Provider value={value}>
                <WrappedComponent {...props} />
            </WithUserDateRedirectContext.Provider>
        )
    }
}
