import React, { ComponentType, FC, ReactElement } from 'react'

type HocProps = {
    highlightWeekends: boolean
}

const withWeekends = <P extends object>(WrappedComponent: ComponentType<P & HocProps>) => {
    return function ({ highlightWeekends, ...props }: P & HocProps): ReactElement {
        return <WrappedComponent {...(props as P)} highlightWeekends={highlightWeekends ?? false} />
    }
}

export default withWeekends
