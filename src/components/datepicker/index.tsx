import React, { useCallback, useEffect, useRef, useState } from 'react'
import Calendar from '@components/calendar'
import Input from '@components/input'
import GlobalStyles from '@styles/global'
import NullStyles from '@styles/nullStyles'
import useOutsideClick from '@utils/hooks/useOutsideClick'

import { StyledDatepicker, StyledWrapper } from './styled'

function Datepicker() {
    const [open, setOpen] = useState<boolean>(false)

    const inputClick = useCallback(() => setOpen(prev => !prev), [open])

    const calendarRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    useOutsideClick(calendarRef, inputRef, setOpen, open)

    return (
        <>
            <GlobalStyles />
            <NullStyles />

            <StyledDatepicker>
                <Input onClick={inputClick} isOpen={open} ref={inputRef} />

                <StyledWrapper $isOpen={open} ref={calendarRef}>
                    <Calendar />
                </StyledWrapper>
            </StyledDatepicker>
        </>
    )
}

export default Datepicker
