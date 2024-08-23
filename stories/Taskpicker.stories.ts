import type { Meta, StoryObj } from '@storybook/react'

import TaskPicker from '../src/components/taskpicker'
import { HOLIDAYS_COLOR } from '../src/constants/colors'

TaskPicker.displayName = 'TaskPicker'
const meta = {
    title: 'Example/Taskpicker',
    component: TaskPicker,
    tags: ['autodocs'],
    argTypes: {
        isHighlightWeekends: {
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
            defaultValue: HOLIDAYS_COLOR,
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
} satisfies Meta<typeof TaskPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
