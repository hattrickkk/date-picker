import React, { ComponentType, ReactElement } from 'react'

type HocProps = {
    highlightWeekends: boolean
}

export const withWeekends = <P extends object>(WrappedComponent: ComponentType<P & HocProps>) => {
    return ({ highlightWeekends, ...props }: P & HocProps): ReactElement => {
        return <WrappedComponent {...(props as P)} highlightWeekends={highlightWeekends ?? false} />
    }
}
