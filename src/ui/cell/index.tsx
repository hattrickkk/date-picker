import React, { memo } from 'react'
import { Flex } from '@styles/flexStyles'

import { StyledCell } from './styled'

type Props = {
    day?: number
    isCurrentMonth?: boolean
    isToday?: boolean
    isSelected?: boolean
    isWeekend?: boolean
    range?: 'start' | 'middle' | 'end' | 'none'
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

export const Cell = memo(
    ({
        isCurrentMonth = true,
        isSelected = false,
        isToday = false,
        day = 1,
        range = 'none',
        isWeekend = false,
        onClick,
    }: Props) => {
        return (
            <StyledCell
                $isCurrentMonth={isCurrentMonth}
                $isToday={isToday}
                $isSelected={isSelected}
                $range={range}
                $isWeekend={isWeekend}
                onClick={onClick}
            >
                <Flex $justifycontent='center' $alignitems='center'>
                    <span> {day}</span>
                </Flex>
            </StyledCell>
        )
    }
)
