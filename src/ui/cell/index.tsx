import React from 'react'
import Flex from '@styles/flexStyles'

import StyledCell from './styled'

type Props = {
    day?: number
    isCurrentMonth?: boolean
    isToday?: boolean
    isSelected?: boolean
    range?: 'start' | 'middle' | 'end' | 'none'
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

function Cell({ isCurrentMonth = true, isSelected = false, isToday = false, day = 1, range = 'none', onClick }: Props) {
    return (
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
    )
}

export default Cell
