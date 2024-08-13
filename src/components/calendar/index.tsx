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
import { getYearForDatePicker } from '@utils/getYearForDatePicker'
import { WithRangeContext } from '@utils/hocs/withRange'
import { WithRestrictionsContext } from '@utils/hocs/withRestrictions'
import { WithTasksContext } from '@utils/hocs/withTasks'
import { WithUserDateRedirectContext } from '@utils/hocs/withUserDateRedirect'
import { useOpen } from '@utils/hooks/useOpen'

import { Clear, StyledCalendar, StyledText, Wrapper } from './styled'

type Props = {
    highlightWeekends: boolean
    selectedDate: number | null
    setSelectedDate: React.Dispatch<React.SetStateAction<number | null>>
    isFromInput: boolean
    rangePicker: boolean
    taskPicker: boolean
    isDatePickerOpen: boolean
}

export const Calendar = memo(
    ({
        highlightWeekends,
        selectedDate,
        setSelectedDate,
        isFromInput,
        rangePicker,
        taskPicker,
        isDatePickerOpen,
    }: Props) => {
        const { minYear, maxYear } = useContext(WithRestrictionsContext)
        const [month, setMonth] = useState(() => getCurrent()[0])
        const [year, setYear] = useState(() => getYearForDatePicker(minYear, maxYear))

        const { isOpen: isMonthPickerOpen, open: openMonthPicker, close: closeMonthPicker } = useOpen()
        const { isOpen: isYearPickerOpen, open: openYearPicker, close: closeYearPicker } = useOpen()

        const { tasksPickerService } = useContext(WithTasksContext)
        const taskDays = taskPicker ? Object.keys(tasksPickerService.getTasks()) : []
        const { date, setInputValue } = useContext(WithUserDateRedirectContext)

        const next = () => {
            if (month === LAST_MONTH) {
                setMonth(FIRST_MONTH)
                setYear(year + 1)
                if (!rangePicker)
                    setInputValue(selectedDate ? getDateforInput(selectedDate, FIRST_MONTH + 1, year + 1) : '')
            } else {
                setMonth(month + 1)
                if (!rangePicker) setInputValue(selectedDate ? getDateforInput(selectedDate, month + 2, year) : '')
            }
        }

        const prev = () => {
            if (month === FIRST_MONTH) {
                setMonth(LAST_MONTH)
                setYear(year - 1)
                if (!rangePicker)
                    setInputValue(selectedDate ? getDateforInput(selectedDate, LAST_MONTH + 1, year - 1) : '')
            } else {
                setMonth(month - 1)
                if (!rangePicker) setInputValue(selectedDate ? getDateforInput(selectedDate, month, year) : '')
            }
        }

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
                    if (!rangePicker) setSelectedDate(day)
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

        const clearClickHandler = useCallback(() => {
            if (rangePicker) {
                setRangeEnd(null)
                setRangeStart(null)
                setInputValue('')
            }
        }, [])

        const yearPickerNextArrowDisable = maxYear - year <= CALENDAR_YEARS_COUNT
        const yearPickerPrevArrowDisable = year - minYear <= 0
        const calendarNextArrowDisable = year >= maxYear && month === LAST_MONTH
        const calendarPrevArrowDisable = year <= minYear && month === FIRST_MONTH

        return (
            <StyledCalendar>
                {taskPicker && isDatePickerOpen && selectedDate && (
                    <TaskModal year={year} day={selectedDate} month={month + 1} />
                )}
                {isMonthPickerOpen && (
                    <Wrapper>
                        <Header
                            nextArrowClick={setNextYear}
                            prevArrowClick={setPrevYear}
                            nextArrowDisable={year >= maxYear}
                            prevArrowDisable={year <= minYear}
                        >
                            <StyledText onClick={openYearPicker}>{year}</StyledText>
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
                            nextArrowDisable={yearPickerNextArrowDisable}
                            prevArrowDisable={yearPickerPrevArrowDisable}
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
                    nextArrowDisable={calendarNextArrowDisable}
                    prevArrowDisable={calendarPrevArrowDisable}
                >
                    <Flex $alignitems='center'>
                        <StyledText onClick={openMonthPicker}> {MONTHS[month]} </StyledText>
                        <StyledText onClick={yearClickHandler}> {year}</StyledText>
                    </Flex>
                </Header>
                <Weakdays />
                <Flex $flexwrap='wrap'>
                    <PrevDays month={month} year={year} minYear={minYear} onClick={cellClick} taskDays={taskDays} />
                    <CurrentDays
                        isHighlightWeekends={highlightWeekends}
                        month={month}
                        year={year}
                        onClick={cellClick}
                        selectedDate={selectedDate}
                        taskDays={taskDays}
                    />
                    <NextDays month={month} year={year} onClick={cellClick} maxYear={maxYear} taskDays={taskDays} />
                </Flex>
                {rangePicker && <Clear onClick={clearClickHandler}>Clear</Clear>}
            </StyledCalendar>
        )
    }
)
