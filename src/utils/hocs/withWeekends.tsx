import React, { ComponentType, ReactElement } from 'react'

type HocProps = {
    isHighlightWeekends?: boolean
}

export const withWeekends = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return ({ isHighlightWeekends = false, ...props }: P & HocProps): ReactElement => {
        return <WrappedComponent {...(props as P)} isHighlightWeekends={isHighlightWeekends ?? false} />
    }
}
