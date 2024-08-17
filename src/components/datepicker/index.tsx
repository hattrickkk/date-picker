import React, { useCallback, useRef, useState } from 'react'

import { Calendar } from '@components/calendar'
import { ErrorBoundary } from '@components/errorBoundary'
import { Input } from '@components/input'
import { HOLIDAYS } from '@constants/holidays'
import { GlobalStyles } from '@styles/global'
import { NullStyles } from '@styles/nullStyles'
import { withHolidays } from '@utils/hocs/withHolidays'
import { withRestrictions } from '@utils/hocs/withRestrictions'
import { withUserDateRedirect } from '@utils/hocs/withUserDateRedirect'
import { withWeekStarts } from '@utils/hocs/withWeakStarts'
import { withWeekends } from '@utils/hocs/withWeekends'
import { useOpen } from '@utils/hooks/useOpen'
import { useOutsideClick } from '@utils/hooks/useOutsideClick'

import { StyledDatepicker, StyledWrapper } from './styled'

type Props = {
    isHighlightWeekends?: boolean
    isFromInput?: boolean
    isRangePicker?: boolean
    isTaskPicker?: boolean
}

const Datepicker = ({
    isHighlightWeekends = false,
    isFromInput = false,
    isRangePicker = false,
    isTaskPicker = false,
}: Props) => {
    const { isOpen: isDatePickerOpen, open: openDatePicker, close: closeDatePicker } = useOpen()

    const inputClick = useCallback(() => openDatePicker(), [isDatePickerOpen])
    const [selectedDate, setSelectedDate] = useState<null | number>(null)

    const calendarRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    useOutsideClick(calendarRef, inputRef, closeDatePicker, isDatePickerOpen)

    return (
        <>
            <GlobalStyles />
            <NullStyles />
            <ErrorBoundary>
                <StyledDatepicker id='date-picker' data-testid='date-picker'>
                    <Input
                        onClick={inputClick}
                        ref={inputRef}
                        setSelectedDate={setSelectedDate}
                        isFromInput={isFromInput}
                        isRangePicker={isRangePicker}
                    />
                    <StyledWrapper $isOpen={isDatePickerOpen} $rangePicker={isRangePicker} ref={calendarRef}>
                        <Calendar
                            isHighlightWeekends={isHighlightWeekends}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            isFromInput={isFromInput}
                            isRangePicker={isRangePicker}
                            isTaskPicker={isTaskPicker}
                            isDatePickerOpen={isDatePickerOpen}
                        />
                    </StyledWrapper>
                </StyledDatepicker>
            </ErrorBoundary>
        </>
    )
}

export default withUserDateRedirect(withHolidays(withRestrictions(withWeekStarts(withWeekends(Datepicker))), HOLIDAYS))
