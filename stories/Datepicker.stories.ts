import type { Meta, StoryObj } from '@storybook/react'

import Datepicker from '../src/components/datepicker'

const meta = {
    title: 'Example/Datepicker',
    component: Datepicker,
    tags: ['autodocs'],
} satisfies Meta<typeof Datepicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
