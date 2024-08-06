import React, { useCallback, useRef } from 'react'
import Calendar from '@components/calendar'
import Input from '@components/input'
import GlobalStyles from '@styles/global'
import NullStyles from '@styles/nullStyles'
import useOpen from '@utils/hooks/useOpen'
import useOutsideClick from '@utils/hooks/useOutsideClick'

import { StyledDatepicker, StyledWrapper } from './styled'

function Datepicker() {
    const { isOpen: isDatePickerOpen, open: openDatePicker, close: closeDatePicker } = useOpen()

    const inputClick = useCallback(() => (isDatePickerOpen ? closeDatePicker() : openDatePicker()), [isDatePickerOpen])

    const calendarRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    useOutsideClick(calendarRef, inputRef, closeDatePicker, isDatePickerOpen)

    return (
        <>
            <GlobalStyles />
            <NullStyles />

            <StyledDatepicker>
                <Input onClick={inputClick} isOpen={isDatePickerOpen} ref={inputRef} />
                <StyledWrapper $isOpen={isDatePickerOpen} ref={calendarRef}>
                    <Calendar />
                </StyledWrapper>
            </StyledDatepicker>
        </>
    )
}

export default Datepicker
