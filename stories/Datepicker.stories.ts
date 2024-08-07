import type { Meta, StoryObj } from '@storybook/react'

import Datepicker from '../src/components/datepicker'

const meta = {
    title: 'Example/Datepicker',
    component: Datepicker,
    argTypes: {
        highlightWeekends: {
            name: 'Highlight weekends',
            type: 'boolean',
            description: 'Highlight weekends or not',
            defaultValue: false,
            control: {
                type: 'boolean',
            },
        },
        weekStarts: {
            name: 'Week starts with',
            type: 'string',
            description: 'What day to start showing week',
            defaultValue: 'Sunday',
            options: ['Monday', 'Sunday'],
            control: {
                type: 'radio',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Datepicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithWeekends: Story = {
    args: {
        highlightWeekends: true,
    },
}

export const StartWithMonday: Story = {
    args: {
        weekStarts: 'Monday',
    },
}
