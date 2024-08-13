import React, { useMemo } from 'react'
import { createPortal } from 'react-dom'

import { Tasks } from '@components/tasks'
import { getDateforInput } from '@utils/getDateForInput'

import { Date, Modal } from './styled'

type Props = {
    day: number
    month: number
    year: number
}

export const TaskModal = ({ day, month, year }: Props) => {
    const container = document.getElementById('date-picker')
    if (container === null) return null

    const date = useMemo(() => getDateforInput(day, month, year), [day, month, year])

    return createPortal(
        <Modal id='task-modal'>
            <Date>{date}</Date>
            <Tasks date={date} />
        </Modal>,
        container
    )
}
