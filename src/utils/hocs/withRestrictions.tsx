import React, { ComponentType, createContext, ReactElement, useMemo } from 'react'

type Props = {
    minYear?: number
    maxYear?: number
}

export const WithRestrictionsContext = createContext<Required<Props>>({ minYear: 0, maxYear: 2300 })

export const withRestrictions = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return ({ minYear = 0, maxYear = 2300, ...props }: P & Props): ReactElement => {
        const max = maxYear
        const min = maxYear < minYear ? maxYear : minYear

        const value = useMemo(() => {
            return { minYear: min, maxYear: max }
        }, [maxYear, minYear])

        return (
            <WithRestrictionsContext.Provider value={value}>
                <WrappedComponent {...(props as P)} />
            </WithRestrictionsContext.Provider>
        )
    }
}
