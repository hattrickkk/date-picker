import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import Header from '../src/components/header'

const meta = {
    title: 'Example/Header',
    component: Header,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        month: {
            type: 'number',
            description: 'Current month',
            defaultValue: 0,
            options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            control: {
                type: 'select',
            },
        },
        year: {
            type: 'number',
            description: 'Current year',
            defaultValue: 2024,
            control: {
                type: 'number',
                max: 2300,
                min: 0,
            },
        },
    },
    args: { nextArrowClick: fn(), prevArrowClick: fn() },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        month: 0,
        year: 2024,
    },
}
