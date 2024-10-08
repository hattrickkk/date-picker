import React, { memo, useCallback, useContext, useEffect, useState } from 'react'

import { CurrentDays } from '@components/currentDays'
import { Header } from '@components/header'
import { MonthPicker } from '@components/monthPicker'
import { NextDays } from '@components/nextDays'
import { PrevDays } from '@components/prevDays'
import { TaskModal } from '@components/taskModal'
import { Weakdays } from '@components/weakdays'
import { YearPicker } from '@components/yearPicker'
import { CALENDAR_YEARS_COUNT, FIRST_MONTH, HALF_OF_THE_MONTH, LAST_MONTH } from '@constants/magicValues'
import { MONTHS } from '@constants/month'
import { Flex } from '@styles/flexStyles'
import { getCurrent } from '@utils/getCurrent'
import { getDateforInput } from '@utils/getDateForInput'
import { getValuesForInput } from '@utils/getValuesForInput'
import { getYearForDatePicker } from '@utils/getYearForDatePicker'
import { WithRangeContext } from '@utils/hocs/withRange'
import { WithRestrictionsContext } from '@utils/hocs/withRestrictions'
import { WithTasksContext } from '@utils/hocs/withTasks'
import { WithUserDateRedirectContext } from '@utils/hocs/withUserDateRedirect'
import { useOpen } from '@utils/hooks/useOpen'

import { Clear, StyledCalendar, StyledText, Wrapper } from './styled'

type Props = {
    isHighlightWeekends: boolean
    selectedDate: number | null
    setSelectedDate: React.Dispatch<React.SetStateAction<number | null>>
    isFromInput: boolean
    isRangePicker: boolean
    isTaskPicker: boolean
    isDatePickerOpen: boolean
}

export const Calendar = memo(
    ({
        isHighlightWeekends,
        selectedDate,
        setSelectedDate,
        isFromInput,
        isRangePicker,
        isTaskPicker,
        isDatePickerOpen,
    }: Props) => {
        const { minYear, maxYear } = useContext(WithRestrictionsContext)
        const [month, setMonth] = useState(() => getCurrent()[0])
        const [year, setYear] = useState(() => getYearForDatePicker(minYear, maxYear))

        const { isOpen: isMonthPickerOpen, open: openMonthPicker, close: closeMonthPicker } = useOpen()
        const { isOpen: isYearPickerOpen, open: openYearPicker, close: closeYearPicker } = useOpen()

        const { tasksPickerService } = useContext(WithTasksContext)
        const taskDays = isTaskPicker ? Object.keys(tasksPickerService.getTasks()) : []
        const { date, setInputValue } = useContext(WithUserDateRedirectContext)

        const next = useCallback(() => {
            if (month === LAST_MONTH) {
                setMonth(FIRST_MONTH)
                setYear(year + 1)
                if (!isRangePicker)
                    setInputValue(
                        selectedDate
                            ? getDateforInput({ day: selectedDate, month: FIRST_MONTH + 1, year: year + 1 })
                            : ''
                    )
            } else {
                setMonth(month + 1)
                if (!isRangePicker)
                    setInputValue(selectedDate ? getDateforInput({ day: selectedDate, month: month + 2, year }) : '')
            }
        }, [year, month, selectedDate])

        const prev = useCallback(() => {
            if (month === FIRST_MONTH) {
                setMonth(LAST_MONTH)
                setYear(year - 1)
                if (!isRangePicker)
                    setInputValue(
                        selectedDate
                            ? getDateforInput({ day: selectedDate, month: LAST_MONTH + 1, year: year - 1 })
                            : ''
                    )
            } else {
                setMonth(month - 1)
                if (!isRangePicker)
                    setInputValue(selectedDate ? getDateforInput({ day: selectedDate, month, year }) : '')
            }
        }, [year, month, selectedDate])

        const setNextYear = useCallback(() => setYear(prevYear => prevYear + 1), [])
        const setPrevYear = useCallback(() => setYear(prevYear => prevYear - 1), [])

        const setNextYears = useCallback(() => setYear(prevYear => prevYear + CALENDAR_YEARS_COUNT), [])
        const setPrevYears = useCallback(() => setYear(prevYear => prevYear - CALENDAR_YEARS_COUNT), [])

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

        const cellClick =
            (day: number, isCurrent: boolean = true) =>
            (e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation()
                let monthToInput = month + 1
                let yearToInput = year
                if (!isCurrent) {
                    if (day < HALF_OF_THE_MONTH) {
                        next()
                        const [newMonth, newYear] = getValuesForInput(month, year, true)
                        monthToInput = newMonth
                        yearToInput = newYear
                        if (isRangePicker) setRange(year, month + 1, day)
                    } else {
                        prev()
                        const [newMonth, newYear] = getValuesForInput(month, year, false)
                        monthToInput = newMonth
                        yearToInput = newYear
                        if (isRangePicker) setRange(year, month - 1, day)
                    }
                    if (!isRangePicker) setSelectedDate(day)
                } else {
                    isRangePicker ? setRange(year, month, day) : setSelectedDate(selectedDate === day ? null : day)
                }
                setInputValue(
                    selectedDate === day ? '' : getDateforInput({ day, month: monthToInput, year: yearToInput })
                )
            }

        useEffect(() => {
            if (date) {
                if (date.month !== month || date.year !== year || date.day !== selectedDate) {
                    setYear(date.year)
                    setMonth(date.month - 1)
                    setSelectedDate(isRangePicker ? null : date.day)
                }
                if (isRangePicker) {
                    setRange(date.year, date.month - 1, date.day)
                }
            }
        }, [date])

        const clearClickHandler = useCallback(() => {
            if (isRangePicker) {
                setRangeEnd(null)
                setRangeStart(null)
                setInputValue('')
            }
        }, [])

        const isYearPickerNextArrowDisable = maxYear - year <= CALENDAR_YEARS_COUNT
        const isYearPickerPrevArrowDisable = year - minYear <= 0
        const isCalendarNextArrowDisable = year >= maxYear && month === LAST_MONTH
        const isCalendarPrevArrowDisable = year <= minYear && month === FIRST_MONTH

        return (
            <StyledCalendar id='calendar'>
                {isTaskPicker && isDatePickerOpen && selectedDate && (
                    <TaskModal year={year} day={selectedDate} month={month + 1} setSelectedDate={setSelectedDate} />
                )}
                {isMonthPickerOpen && (
                    <Wrapper data-testid='monthPicker'>
                        <Header
                            nextArrowClick={setNextYear}
                            prevArrowClick={setPrevYear}
                            isNextArrowDisable={year >= maxYear}
                            isPrevArrowDisable={year <= minYear}
                        >
                            <StyledText onClick={openYearPicker}>{year}</StyledText>
                        </Header>
                        <MonthPicker
                            year={year}
                            setMonth={setMonth}
                            closeMonthPicker={closeMonthPicker}
                            isRangePicker={isRangePicker}
                        />
                    </Wrapper>
                )}
                {isYearPickerOpen && (
                    <Wrapper data-testid='yearPicker'>
                        <Header
                            nextArrowClick={setNextYears}
                            prevArrowClick={setPrevYears}
                            isNextArrowDisable={isYearPickerNextArrowDisable}
                            isPrevArrowDisable={isYearPickerPrevArrowDisable}
                        />
                        <YearPicker
                            setYear={setYear}
                            closeYearPicker={closeYearPicker}
                            year={year}
                            isRangePicker={isRangePicker}
                        />
                    </Wrapper>
                )}

                <Header
                    nextArrowClick={next}
                    prevArrowClick={prev}
                    isNextArrowDisable={isCalendarNextArrowDisable}
                    isPrevArrowDisable={isCalendarPrevArrowDisable}
                >
                    <Flex $alignitems='center'>
                        <StyledText onClick={openMonthPicker} data-testid='month'>
                            {MONTHS[month]}
                        </StyledText>
                        <StyledText onClick={yearClickHandler} data-testid='year'>
                            {year}
                        </StyledText>
                    </Flex>
                </Header>
                <Weakdays />
                <Flex $flexwrap='wrap'>
                    <PrevDays month={month} year={year} minYear={minYear} onClick={cellClick} taskDays={taskDays} />
                    <CurrentDays
                        isHighlightWeekends={isHighlightWeekends}
                        month={month}
                        year={year}
                        onClick={cellClick}
                        selectedDate={selectedDate}
                        taskDays={taskDays}
                    />
                    <NextDays month={month} year={year} onClick={cellClick} maxYear={maxYear} taskDays={taskDays} />
                </Flex>
                {isRangePicker && <Clear onClick={clearClickHandler}>Clear</Clear>}
            </StyledCalendar>
        )
    }
)
