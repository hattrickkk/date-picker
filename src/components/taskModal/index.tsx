import React, { useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'

import { Tasks } from '@components/tasks'
import { GlobalStyles } from '@styles/global'
import { NullStyles } from '@styles/nullStyles'
import { CloseIcon } from '@ui/closeIcon'
import { getDateforInput } from '@utils/getDateForInput'

import { Date, Header, Modal, Wrapper } from './styled'

type Props = {
    day: number
    month: number
    year: number
    setSelectedDate: React.Dispatch<React.SetStateAction<number | null>>
}

export const TaskModal = ({ day, month, year, setSelectedDate }: Props) => {
    const container = document.getElementById('date-picker')
    if (!container) return null

    const date = useMemo(() => getDateforInput({ day, month, year }), [day, month, year])

    const closeIconHandler = useCallback(() => setSelectedDate(null), [])

    return createPortal(
        <>
            <NullStyles />
            <GlobalStyles />
            <Modal id='task-modal'>
                <Header>
                    <Date>{date}</Date>
                    <Wrapper onClick={closeIconHandler}>
                        <CloseIcon />
                    </Wrapper>
                </Header>

                <Tasks date={date} />
            </Modal>
        </>,
        container
    )
}
