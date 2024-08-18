import React, { ComponentType, createContext, ReactElement, useMemo } from 'react'

type WeekStartsContextType = {
    start: 'Monday' | 'Sunday'
}
export const WeekStartsContext = createContext<WeekStartsContextType>({ start: 'Sunday' })

export type WithWeekStartsProps = {
    weekStarts?: 'Monday' | 'Sunday'
}

export const withWeekStarts = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return ({ weekStarts = 'Sunday', ...props }: P & WithWeekStartsProps): ReactElement => {
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
