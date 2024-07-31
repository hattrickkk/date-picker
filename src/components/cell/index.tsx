import React from 'react'
import Flex from '@styles/flexStyles'
import GlobalStyles from '@styles/global'
import NullStyles from '@styles/nullStyles'

import StyledCell from './styled'

type Props = {
    day?: number
    isCurrentMonth?: boolean
    isToday?: boolean
    isSelected?: boolean
    range?: 'start' | 'middle' | 'end' | 'none'
    onClick?: VoidFunction
}

function Cell({ isCurrentMonth = true, isSelected = false, isToday = false, day = 1, range = 'none', onClick }: Props) {
    return (
        <>
            <GlobalStyles />
            <NullStyles />
            <StyledCell
                $isCurrentMonth={isCurrentMonth}
                $isToday={isToday}
                $isSelected={isSelected}
                $range={range}
                onClick={onClick}
            >
                <Flex $justifycontent='center' $alignitems='center'>
                    <span> {day}</span>
                </Flex>
            </StyledCell>
        </>
    )
}

export default Cell
