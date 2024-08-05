import React, { forwardRef, RefObject } from 'react'
import CalendarIcon from '@ui/calendarIcon'
import CloseIcon from '@ui/closeIcon'

import { StyledCalendarIcon, StyledCloseIcon, StyledInput, StyledWrapper } from './styled'

type Props = {
    onClick: VoidFunction
    isOpen: boolean
}

const Input = forwardRef<HTMLInputElement, Props>(({ onClick, isOpen }: Props, ref) => {
    return (
        <StyledWrapper>
            <StyledCalendarIcon>
                <CalendarIcon />
            </StyledCalendarIcon>

            <StyledInput type='text' placeholder='Choose Date' onClick={onClick} ref={ref} />
            {!isOpen && (
                <StyledCloseIcon>
                    <CloseIcon />
                </StyledCloseIcon>
            )}
        </StyledWrapper>
    )
})

export default Input
