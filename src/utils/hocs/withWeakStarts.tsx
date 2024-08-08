import React, { ComponentType, createContext, FC, ReactElement, useMemo } from 'react'

type WeekStartsContextType = {
    start: 'Monday' | 'Sunday'
}
export const WeekStartsContext = createContext<WeekStartsContextType>({ start: 'Sunday' })

type HocProps = {
    weekStarts: 'Monday' | 'Sunday'
}

export const withWeekStarts = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return ({ weekStarts, ...props }: P & HocProps): ReactElement => {
        const value = useMemo(() => {
            return { start: weekStarts }
        }, [weekStarts])
        return (
            <WeekStartsContext.Provider value={value}>
                <WrappedComponent {...(props as P)} />
            </WeekStartsContext.Provider>
        )
    }
}
