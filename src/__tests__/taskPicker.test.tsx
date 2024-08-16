import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { Taskpicker } from '@components/taskpicker'

const addTask = async (title: string) => {
    const user = userEvent.setup()
    const input = screen.getAllByRole('textbox').at(-1)
    const addButton = screen.getByText('Add')
    if (input) {
        await user.type(input, title)
        await user.click(addButton)
    }
}

describe('taskpicker renders correctly', () => {
    beforeEach(async () => {
        render(<Taskpicker />)
        expect(screen.getByTestId('date-picker')).toBeInTheDocument()
        const user = userEvent.setup()
        await user.click(screen.getByTestId('input'))
        const day = screen.getAllByTestId('cell')[15]
        await user.click(day)
    })

    it('taskPicker renders', async () => {
        expect(screen.getByText('Add')).toBeInTheDocument()
    })

    it('add new task', async () => {
        const input = screen.getAllByRole('textbox').at(-1)
        await addTask('newTask')
        expect(input).toHaveValue('')
        expect(screen.getByText('newTask')).toBeInTheDocument()
        expect(screen.getByText('Uncompleted')).toBeInTheDocument()
    })

    it('complete and uncomplete task', async () => {
        const user = userEvent.setup()
        await addTask('task')
        const checkbox = screen.getAllByRole('checkbox')[1]
        expect(checkbox).not.toBeChecked()
        await user.click(checkbox)
        expect(checkbox).toBeChecked()
        expect(screen.getByText('Completed')).toBeInTheDocument()
        expect(screen.getByText('task')).toHaveStyle('text-decoration: line-through;')
        await user.click(checkbox)
        expect(checkbox).not.toBeChecked()
        expect(screen.getByText('Uncompleted')).toBeInTheDocument()
    })

    it('remove task', async () => {
        const user = userEvent.setup()
        await addTask('new task 3')
        const removeIcon = screen.getByText('new task 3').nextElementSibling
        await user.click(removeIcon as Element)
        expect(screen.queryByText('new task 3')).not.toBeInTheDocument()
    })
})
