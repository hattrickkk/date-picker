import React, { memo, useCallback, useContext, useEffect, useState } from 'react'

import { CurrentDays } from '@components/currentDays'
import { Header } from '@components/header'
import { MonthPicker } from '@components/monthPicker'
import { NextDays } from '@components/nextDays'
import { PrevDays } from '@components/prevDays'
import { Weakdays } from '@components/weakdays'
import { YearPicker } from '@components/yearPicker'
import { CALENDAR_YEARS_COUNT, FIRST_MONTH, HALF_OF_THE_MONTH, LAST_MONTH } from '@constants/magicValues'
import { MONTHS } from '@constants/month'
import { Flex } from '@styles/flexStyles'
import { getCurrent } from '@utils/getCurrent'
import { getDateforInput } from '@utils/getDateForInput'
import { getYearForDatePicker } from '@utils/getYearForDatePicker'
import { WithRangeContext } from '@utils/hocs/withRange'
import { WithRestrictionsContext } from '@utils/hocs/withRestrictions'
import { withUserDateRedirect, WithUserDateRedirectContext } from '@utils/hocs/withUserDateRedirect'
import { useOpen } from '@utils/hooks/useOpen'

import { Clear, StyledCalendar, StyledText, Wrapper } from './styled'

type Props = {
    highlightWeekends: boolean
    selectedDate: number | null
    setSelectedDate: React.Dispatch<React.SetStateAction<number | null>>
    isFromInput: boolean
    rangePicker: boolean
}

export const Calendar = memo(
    ({ highlightWeekends, selectedDate, setSelectedDate, isFromInput, rangePicker }: Props) => {
        const { minYear, maxYear } = useContext(WithRestrictionsContext)
        const [month, setMonth] = useState(() => getCurrent()[0])
        const [year, setYear] = useState(() => getYearForDatePicker(minYear, maxYear))

        const { isOpen: isMonthPickerOpen, open: openMonthPicker, close: closeMonthPicker } = useOpen()
        const { isOpen: isYearPickerOpen, open: openYearPicker, close: closeYearPicker } = useOpen()

        const next = useCallback(() => {
            if (month === LAST_MONTH) {
                setMonth(FIRST_MONTH)
                setYear(year + 1)
            } else {
                setMonth(month + 1)
            }
        }, [month])

        const prev = useCallback(() => {
            if (month === FIRST_MONTH) {
                setMonth(LAST_MONTH)
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

        const { setRangeStart, setRangeEnd } = useContext(WithRangeContext)

        const setRange = useCallback((rangeYear: number, rangeMonth: number, rangeDday: number) => {
            if (isFromInput) {
                setRangeStart({ year: rangeYear, month: rangeMonth, day: rangeDday })
            } else {
                setRangeEnd({ year: rangeYear, month: rangeMonth, day: rangeDday })
            }
        }, [])

        const { date, setInputValue } = useContext(WithUserDateRedirectContext)

        const cellClick =
            (day: number, isCurrent: boolean = true) =>
            (e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation()
                let monthToInput = month + 1
                if (!isCurrent) {
                    if (day < HALF_OF_THE_MONTH) {
                        next()
                        ++monthToInput
                        if (rangePicker) setRange(year, month + 1, day)
                    } else {
                        prev()
                        --monthToInput
                        if (rangePicker) setRange(year, month - 1, day)
                    }
                } else {
                    rangePicker ? setRange(year, month, day) : setSelectedDate(selectedDate === day ? null : day)
                }
                setInputValue(getDateforInput(day, monthToInput, year))
            }

        useEffect(() => {
            if (date) {
                if (date.month !== month || date.year !== year || date.day !== selectedDate) {
                    setYear(date.year)
                    setMonth(date.month - 1)
                    setSelectedDate(rangePicker ? null : date.day)
                }
                if (rangePicker) {
                    setRange(date.year, date.month - 1, date.day)
                }
            }
        }, [date])

        const clearClickHandler = () => {
            if (rangePicker) {
                setRangeEnd(null)
                setRangeStart(null)
                setInputValue('')
            }
        }

        return (
            <StyledCalendar>
                {isMonthPickerOpen && (
                    <Wrapper>
                        <Header
                            nextArrowClick={setNextYear}
                            prevArrowClick={setPrevYear}
                            nextArrowDisable={year >= maxYear}
                            prevArrowDisable={year <= minYear}
                        >
                            <StyledText onClick={openYearPicker}> {year}</StyledText>
                        </Header>
                        <MonthPicker
                            setMonth={setMonth}
                            closeMonthPicker={closeMonthPicker}
                            rangePicker={rangePicker}
                        />
                    </Wrapper>
                )}
                {isYearPickerOpen && (
                    <Wrapper>
                        <Header
                            nextArrowClick={setNextYears}
                            prevArrowClick={setPrevYears}
                            nextArrowDisable={maxYear - year <= CALENDAR_YEARS_COUNT}
                            prevArrowDisable={year - minYear <= 0}
                        />
                        <YearPicker
                            setYear={setYear}
                            closeYearPicker={closeYearPicker}
                            year={year}
                            rangePicker={rangePicker}
                        />
                    </Wrapper>
                )}

                <Header
                    nextArrowClick={next}
                    prevArrowClick={prev}
                    nextArrowDisable={year >= maxYear && month === LAST_MONTH}
                    prevArrowDisable={year <= minYear && month === FIRST_MONTH}
                >
                    <Flex $alignitems='center'>
                        <StyledText onClick={openMonthPicker}> {MONTHS[month]} </StyledText>
                        <StyledText onClick={yearClickHandler}> {year}</StyledText>
                    </Flex>
                </Header>
                <Weakdays />
                <Flex $flexwrap='wrap'>
                    <PrevDays month={month} year={year} minYear={minYear} onClick={cellClick} />
                    <CurrentDays
                        isHighlightWeekends={highlightWeekends}
                        month={month}
                        year={year}
                        onClick={cellClick}
                        selectedDate={selectedDate}
                    />
                    <NextDays month={month} year={year} onClick={cellClick} maxYear={maxYear} />
                </Flex>
                {rangePicker && <Clear onClick={clearClickHandler}>Clear</Clear>}
            </StyledCalendar>
        )
    }
)
