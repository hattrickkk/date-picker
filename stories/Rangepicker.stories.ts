import type { Meta, StoryObj } from '@storybook/react'

import Rangepicker from '../src/components/rangepicker'

const meta = {
    title: 'Example/Rangepicker',
    component: Rangepicker,
    tags: ['autodocs'],
} satisfies Meta<typeof Rangepicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
