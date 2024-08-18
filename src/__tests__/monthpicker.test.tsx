import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { MonthPicker } from '@components/monthPicker'
import { MONTHS } from '@constants/month'

const setMonth = jest.fn()
const closeMonthPicker = jest.fn()

describe('month picker renders correctly', () => {
    beforeEach(() => {
        render(
            <MonthPicker setMonth={setMonth} closeMonthPicker={closeMonthPicker} isRangePicker={false} year={2024} />
        )
    })

    it('month picker renders', () => {
        MONTHS.forEach(el => expect(screen.getByText(el.slice(0, 3))).toBeInTheDocument())
    })

    it('month picker element clicking triggers functions', async () => {
        const user = userEvent.setup()
        await user.click(screen.getByText('Jan'))
        expect(closeMonthPicker).toHaveBeenCalledTimes(1)
        expect(setMonth).toHaveBeenCalledTimes(1)
        expect(setMonth).toHaveBeenCalledWith(0)
    })
})
