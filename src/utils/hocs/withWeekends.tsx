import React, { ComponentType, ReactElement } from 'react'

export type WithWeekendsProps = {
    isHighlightWeekends?: boolean
}

export const withWeekends = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return ({ isHighlightWeekends = false, ...props }: P & WithWeekendsProps): ReactElement => {
        return <WrappedComponent {...(props as P)} isHighlightWeekends={isHighlightWeekends ?? false} />
    }
}
