import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { Calendar } from '@components/calendar'
import { CALENDAR_YEARS_COUNT, FIRST_MONTH, LAST_MONTH } from '@constants/magicValues'
import { MONTHS } from '@constants/month'
import { DatePickerService } from '@utils/DatePickerService'
import { getCurrent } from '@utils/getCurrent'
import { WithHolidaysContext } from '@utils/hocs/withHolidays'
import { WithUserDateRedirectContext } from '@utils/hocs/withUserDateRedirect'

const setSelectedDate = jest.fn()
const selectedDate = 12
const newSelectedDate = 10

const currentYear = getCurrent()[1]
const currentMonth = getCurrent()[0]

const HolidaysContextCalue = {
    datePickerService: new DatePickerService(),
}

const UserRedirectContextCalue = {
    inputValue: '',
    setInputValue: jest.fn(),
    date: null,
    setDate: jest.fn(),
}

const defaultProps = {
    isHighlightWeekends: false,
    selectedDate,
    setSelectedDate,
    isFromInput: false,
    isRangePicker: false,
    isTaskPicker: false,
    isDatePickerOpen: true,
}

describe('calendar renders correctly', () => {
    beforeEach(() => {
        render(
            <WithUserDateRedirectContext.Provider value={UserRedirectContextCalue}>
                <WithHolidaysContext.Provider value={HolidaysContextCalue}>
                    <Calendar {...defaultProps} />
                </WithHolidaysContext.Provider>
            </WithUserDateRedirectContext.Provider>
        )
    })

    it('calendar days render correctly', () => {
        expect(screen.getByText(currentYear)).toBeInTheDocument()
        for (let i = 1; i <= new Date(Date.now()).getDate(); i++) {
            expect(screen.queryAllByText(i)[0]).toBeInTheDocument()
        }
    })

    it('opens MonthPicker on month click', () => {
        fireEvent.click(screen.getByTestId('month'))
        expect(screen.getByTestId('monthPicker')).toBeInTheDocument()
    })

    it('opens YearPicker on year click', () => {
        fireEvent.click(screen.getByTestId('year'))
        expect(screen.getByTestId('yearPicker')).toBeInTheDocument()
    })

    describe('clicking next/prev arrows', () => {
        it('clicking next arrow in month picker', () => {
            fireEvent.click(screen.getByTestId('month'))
            expect(screen.getByTestId('monthPicker')).toBeInTheDocument()

            const nextArrow = screen.getAllByTestId('next-arrow')[0]
            expect(screen.queryAllByText(currentYear)[0]).toBeInTheDocument()

            fireEvent.click(nextArrow)
            expect(screen.queryAllByText(currentYear + 1)[0]).toBeInTheDocument()
        })

        it('clicking prev arrow in month picker', () => {
            fireEvent.click(screen.getByTestId('month'))
            expect(screen.getByTestId('monthPicker')).toBeInTheDocument()

            const nextArrow = screen.getAllByTestId('prev-arrow')[0]
            expect(screen.queryAllByText(currentYear)[0]).toBeInTheDocument()

            fireEvent.click(nextArrow)
            expect(screen.queryAllByText(currentYear - 1)[0]).toBeInTheDocument()
        })

        it('clicking next arrow in year picker', () => {
            fireEvent.click(screen.getByTestId('year'))
            expect(screen.getByTestId('yearPicker')).toBeInTheDocument()

            for (let i = currentYear; i <= currentYear + CALENDAR_YEARS_COUNT; i++) {
                expect(screen.queryAllByText(i)[0]).toBeInTheDocument()
            }

            const nextArrow = screen.getAllByTestId('next-arrow')[1]
            fireEvent.click(nextArrow)
            for (let i = currentYear + CALENDAR_YEARS_COUNT; i <= currentYear + 2 * CALENDAR_YEARS_COUNT; i++) {
                expect(screen.queryAllByText(i)[0]).toBeInTheDocument()
            }
        })

        it('clicking prev arrow in year picker', () => {
            fireEvent.click(screen.getByTestId('year'))
            expect(screen.getByTestId('yearPicker')).toBeInTheDocument()

            for (let i = currentYear; i <= currentYear + CALENDAR_YEARS_COUNT; i++) {
                expect(screen.queryAllByText(i)[0]).toBeInTheDocument()
            }

            const prevArrow = screen.getAllByTestId('prev-arrow')[1]
            fireEvent.click(prevArrow)
            for (let i = currentYear - CALENDAR_YEARS_COUNT; i <= currentYear; i++) {
                expect(screen.queryAllByText(i)[0]).toBeInTheDocument()
            }
        })

        it('clicking prev arrow in calendar', () => {
            const prevArrow = screen.getAllByTestId('prev-arrow')[0]
            fireEvent.click(prevArrow)
            expect(screen.getByText(currentMonth === FIRST_MONTH ? currentYear - 1 : currentYear)).toBeInTheDocument()
            expect(
                screen.getByText(currentMonth === FIRST_MONTH ? MONTHS[LAST_MONTH] : MONTHS[currentMonth - 1])
            ).toBeInTheDocument()
        })

        it('clicking next arrow in calendar', () => {
            const nextArrow = screen.getAllByTestId('next-arrow')[0]
            fireEvent.click(nextArrow)
            expect(screen.getByText(currentMonth === LAST_MONTH ? currentYear + 1 : currentYear)).toBeInTheDocument()
            expect(
                screen.getByText(currentMonth === LAST_MONTH ? MONTHS[FIRST_MONTH] : MONTHS[currentMonth + 1])
            ).toBeInTheDocument()
        })
    })
})
