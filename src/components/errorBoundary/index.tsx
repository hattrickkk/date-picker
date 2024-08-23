import React, { PureComponent, ReactElement } from 'react'

import { Text } from './styled'

type Props = {
    children: ReactElement
}

type State = {
    hasError: boolean
}

export class ErrorBoundary extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    render() {
        const { hasError } = this.state
        const { children } = this.props
        if (hasError) return <Text>Something went wrong</Text>
        return children
    }
}
