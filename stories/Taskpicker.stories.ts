import type { Meta, StoryObj } from '@storybook/react'

import { Taskpicker } from '../src/components/taskpicker'

const meta = {
    title: 'Example/Taskpicker',
    component: Taskpicker,
    tags: ['autodocs'],
} satisfies Meta<typeof Taskpicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
