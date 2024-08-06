import React, { useCallback, useState } from 'react'
import CurrentDays from '@components/currentDays'
import Header from '@components/header'
import MonthPicker from '@components/monthPicker'
import NextDays from '@components/nextDays'
import PrevDays from '@components/prevDays'
import Weakdays from '@components/weakdays'
import YearPicker from '@components/yearPicker'
import { CALENDAR_YEARS_COUNT, HALF_OF_THE_MONTH } from '@constants/magicValues'
import MONTHS from '@constants/month'
import Flex from '@styles/flexStyles'
import getCurrent from '@utils/getCurrent'
import useOpen from '@utils/hooks/useOpen'

import { StyledCalendar, StyledText, Wrapper } from './styled'

function Calendar() {
    const [month, setMonth] = useState(() => getCurrent()[0])
    const [year, setYear] = useState(() => getCurrent()[1])
    const [selectedDate, setSelectedDate] = useState<null | number>(null)

    const { isOpen: isMonthPickerOpen, open: openMonthPicker, close: closeMonthPicker } = useOpen()
    const { isOpen: isYearPickerOpen, open: openYearPicker, close: closeYearPicker } = useOpen()

    const next = useCallback(() => {
        if (month === 11) {
            setMonth(0)
            setYear(year + 1)
        } else {
            setMonth(month + 1)
        }
    }, [month])

    const prev = useCallback(() => {
        if (month === 0) {
            setMonth(11)
            setYear(year - 1)
        } else {
            setMonth(month - 1)
        }
    }, [month])

    const setNextYear = useCallback(() => setYear(prevValue => prevValue + 1), [])
    const setPrevYear = useCallback(() => setYear(prevValue => prevValue - 1), [])

    const setNextYears = useCallback(() => setYear(prevValue => prevValue + CALENDAR_YEARS_COUNT), [])
    const setPrevYears = useCallback(() => setYear(prevValue => prevValue - CALENDAR_YEARS_COUNT), [])

    const yearClickHandler = useCallback(() => {
        openYearPicker()
        openMonthPicker()
    }, [])

    const cellClick =
        (day: number, isCurrent: boolean = true) =>
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation()
            if (!isCurrent) {
                day < HALF_OF_THE_MONTH ? next() : prev()
            }
            setSelectedDate(selectedDate === day ? null : day)
        }

    return (
        <StyledCalendar>
            {isMonthPickerOpen && (
                <Wrapper>
                    <Header nextArrowClick={setNextYear} prevArrowClick={setPrevYear}>
                        <StyledText onClick={openYearPicker}> {year}</StyledText>
                    </Header>
                    <MonthPicker setMonth={setMonth} closeMonthPicker={closeMonthPicker} />
                </Wrapper>
            )}
            {isYearPickerOpen && (
                <Wrapper>
                    <Header nextArrowClick={setNextYears} prevArrowClick={setPrevYears} />
                    <YearPicker setYear={setYear} closeYearPicker={closeYearPicker} year={year} />
                </Wrapper>
            )}

            <Header nextArrowClick={next} prevArrowClick={prev}>
                <Flex $alignitems='center'>
                    <StyledText onClick={openMonthPicker}> {MONTHS[month]} </StyledText>
                    <StyledText onClick={yearClickHandler}> {year}</StyledText>
                </Flex>
            </Header>
            <Weakdays />
            <Flex $flexwrap='wrap'>
                <PrevDays month={month} year={year} onClick={cellClick} />
                <CurrentDays month={month} year={year} onClick={cellClick} selectedDate={selectedDate} />
                <NextDays month={month} year={year} onClick={cellClick} />
            </Flex>
        </StyledCalendar>
    )
}

export default React.memo(Calendar)
