import React, { ComponentType, createContext, ReactElement, useMemo } from 'react'

export type WithRestrictionsProps = {
    minYear?: number
    maxYear?: number
}

export const WithRestrictionsContext = createContext<Required<WithRestrictionsProps>>({ minYear: 0, maxYear: 2300 })

export const withRestrictions = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return ({ minYear = 0, maxYear = 2300, ...props }: P & WithRestrictionsProps): ReactElement => {
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
