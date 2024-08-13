import type { Meta, StoryObj } from '@storybook/react'

import Datepicker from '../src/components/datepicker'
import * as colors from '../src/constants/colors'

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
        maxYear: {
            name: 'Max year',
            type: 'number',
            description: 'Max year in date picker',
            defaultValue: 2300,
            control: {
                type: 'number',
                min: 0,
            },
        },
        minYear: {
            name: 'Min year',
            type: 'number',
            description: 'Mix year in date picker',
            defaultValue: 0,
            control: {
                type: 'number',
                min: 0,
            },
        },
        holidaysColor: {
            name: 'Holiday color',
            type: 'string',
            description: 'Background color for holidays',
            defaultValue: colors.HOLIDAYS_COLOR,
            control: {
                type: 'color',
            },
        },
        hideHolidays: {
            name: 'Show Holidays',
            type: 'boolean',
            description: 'Show Holidays or not',
            defaultValue: true,
            control: {
                type: 'boolean',
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
