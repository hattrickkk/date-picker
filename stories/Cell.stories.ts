import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Cell } from '../src/ui/cell'

const meta = {
    title: 'Example/Cell',
    component: Cell,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        isToday: {
            type: 'boolean',
            description: 'Is today or not',
            defaultValue: false,
            control: {
                type: 'boolean',
            },
        },

        isCurrentMonth: {
            type: 'boolean',
            description: 'Is the date from current month or not',
            defaultValue: true,
            control: {
                type: 'boolean',
            },
        },
        isSelected: {
            type: 'boolean',
            description: 'Is the date selected or not',
            defaultValue: false,
            control: {
                type: 'boolean',
            },
        },
        range: {
            type: 'string',
            description: 'Is date in range or not',
            defaultValue: 'none',
            options: ['none', 'start', 'middle', 'end'],
            control: {
                type: 'radio',
            },
        },
        day: {
            type: 'number',
            description: 'The bumber of day of the month',
            defaultValue: 1,
            control: {
                type: 'number',
                max: '31',
                min: '1',
            },
        },
    },
    args: { onClick: fn() },
} satisfies Meta<typeof Cell>

export default meta
type Story = StoryObj<typeof meta>

export const Today: Story = {
    args: {
        isToday: true,
        isCurrentMonth: true,
    },
}

export const CurrentMonth: Story = {
    args: {
        isCurrentMonth: true,
    },
}

export const Selected: Story = {
    args: {
        isSelected: true,
    },
}

export const rangeStart: Story = {
    args: {
        range: 'start',
    },
}

export const rangeMiddle: Story = {
    args: {
        range: 'middle',
    },
}

export const rangeEnd: Story = {
    args: {
        range: 'end',
    },
}
