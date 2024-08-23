import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { Input } from '@components/input'
import { WithUserDateRedirectContext } from '@utils/hocs/withUserDateRedirect'

const inputClick = jest.fn()
const setSelectedDate = jest.fn()
const setInputValue = jest.fn()
const contextValue = {
    inputValue: '',
    setInputValue,
    date: null,
    setDate: jest.fn(),
}

describe('input renders correctly', () => {
    beforeEach(() => {
        render(
            <WithUserDateRedirectContext.Provider value={contextValue}>
                <Input
                    onClick={inputClick}
                    setSelectedDate={setSelectedDate}
                    isFromInput={false}
                    isRangePicker={false}
                />
            </WithUserDateRedirectContext.Provider>
        )
    })

    it('input renders', async () => {
        const input = screen.getByTestId('input')
        expect(input).toBeInTheDocument()
    })

    it('typing correct values in input', async () => {
        const input = screen.getByTestId('input')

        const user = userEvent.setup()
        await user.type(input, '12/12')

        expect(setInputValue).toHaveBeenCalledWith('1')
        expect(setInputValue).toHaveBeenCalledWith('2')
        expect(setInputValue).toHaveBeenCalledWith('/')
    })

    it('typing incorrect values in input', async () => {
        const input = screen.getByTestId('input')

        const user = userEvent.setup()
        await user.type(input, 'incorrect text')

        expect(setInputValue).toHaveBeenCalledWith('')

        await user.type(input, '12/132{enter}')
        expect(screen.getByText('Invalid format')).toBeInTheDocument()
    })
})
