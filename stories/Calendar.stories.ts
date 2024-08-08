import type { Meta, StoryObj } from '@storybook/react'

import { Calendar } from '../src/components/calendar'

const meta = {
    title: 'Example/Calendar',
    component: Calendar,
    parameters: {
        layout: 'centered',
    },
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
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        highlightWeekends: false,
    },
}
