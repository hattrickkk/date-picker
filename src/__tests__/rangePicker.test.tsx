import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import RangePicker from '@components/rangepicker'
import { RANGE_BLUE } from '@constants/colors'
import { getRangeValue } from '@utils/rangePicker/getRangeValue'

const startRange = {
    day: 10,
    month: 10,
    year: 2024,
}

const endRange = {
    day: 15,
    month: 10,
    year: 2024,
}

describe('rangePicker renders correctly', () => {
    beforeEach(() => {
        render(<RangePicker />)
    })

    it('rangePicker renders', () => {
        expect(screen.getAllByTestId('date-picker')).toHaveLength(2)
        expect(screen.getByText('From:')).toBeInTheDocument()
        expect(screen.getByText('To:')).toBeInTheDocument()
    })

    it('create range by entering date to input and clear range', async () => {
        const user = userEvent.setup()

        const [fromInput, toInput] = screen.getAllByTestId('date-picker')

        await user.click(fromInput)
        await user.type(fromInput, `${startRange.day}/${startRange.month}/${startRange.year}{enter}`)

        await user.click(toInput)
        await user.type(toInput, `${endRange.day}/${endRange.month + 1}/${endRange.year}{enter}`)

        within(fromInput)
            .getAllByTestId('cell')
            .forEach(({ textContent }) => {
                if (textContent) {
                    if (+textContent > startRange.day && +textContent < endRange.day) {
                        expect(
                            getRangeValue(startRange, endRange, {
                                year: startRange.year,
                                month: startRange.month,
                                day: +textContent,
                            })
                        ).toBe('middle')
                    }
                }
            })

        const clearBtn = screen.getAllByText('Clear')[0]
        user.click(clearBtn)
        within(fromInput)
            .queryAllByTestId('cell')
            .forEach(element => {
                if (
                    +(element.textContent as string) > startRange.day &&
                    +(element.textContent as string) < endRange.day
                ) {
                    expect(element).not.toHaveStyle(`background-color: ${RANGE_BLUE}`)
                }
            })
    })
})
