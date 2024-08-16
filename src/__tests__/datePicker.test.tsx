import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import Datepicker from '@components/datepicker'
import { BLUE } from '@constants/colors'

const day = '12'
const month = '12'
const year = '2024'

describe('datepicker renders correctly', () => {
    beforeEach(() => {
        render(<Datepicker />)
    })

    it('datepicker renders', () => {
        expect(screen.getByTestId('date-picker')).toBeInTheDocument()
    })

    it('remove date from input', async () => {
        const input = screen.getByTestId('input')
        const user = userEvent.setup()

        await user.click(input)
        await user.type(input, '12/12/2024')

        const removeIcon = screen.getByTestId('remove-icon')
        await user.click(removeIcon)
        expect(input).toHaveValue('')
    })

    it('select cell by date from input', async () => {
        const input = screen.getByTestId('input')
        const user = userEvent.setup()

        await user.click(input)
        await user.type(input, `${day}/${month}/${year}{enter}`)

        screen.getAllByTestId('cell').find(async element => {
            if (element.textContent === day) {
                expect(element).toHaveStyle(`background-color: ${BLUE}`)
            }
        })
    })
})
