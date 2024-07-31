import React from 'react'

import StyledButton from './button.styled'

export interface ButtonProps {
    primary?: boolean
    backgroundColor?: string
    size?: 'small' | 'medium' | 'large'
    label: string
    onClick?: () => void
}

function Button({ primary = false, label, backgroundColor, size = 'large', ...props }: ButtonProps) {
    return (
        <StyledButton $primary={primary} $size={size} {...props} $bg={backgroundColor || (primary ? 'blue' : 'white')}>
            {label}
        </StyledButton>
    )
}

export default Button
