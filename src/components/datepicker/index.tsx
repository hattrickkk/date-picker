import React, { useCallback, useRef } from 'react'

import { Calendar } from '@components/calendar'
import { Input } from '@components/input'
import { GlobalStyles } from '@styles/global'
import { NullStyles } from '@styles/nullStyles'
import { withWeekStarts } from '@utils/hocs/withWeakStarts'
import { withWeekends } from '@utils/hocs/withWeekends'
import { useOpen } from '@utils/hooks/useOpen'
import { useOutsideClick } from '@utils/hooks/useOutsideClick'

import { StyledDatepicker, StyledWrapper } from './styled'

type Props = {
    highlightWeekends: boolean
}

const Datepicker = ({ highlightWeekends }: Props) => {
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
                    <Calendar highlightWeekends={highlightWeekends} />
                </StyledWrapper>
            </StyledDatepicker>
        </>
    )
}

export default withWeekStarts(withWeekends(Datepicker))
