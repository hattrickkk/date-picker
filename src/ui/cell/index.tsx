import React, { memo } from 'react'

import * as colors from '@constants/colors'
import { Flex } from '@styles/flexStyles'

import { StyledCell } from './styled'

type Props = {
    day?: number
    isCurrentMonth?: boolean
    isToday?: boolean
    isSelected?: boolean
    isWeekend?: boolean
    range?: 'start' | 'middle' | 'end' | 'none'
    disable?: boolean
    isHoliday?: boolean
    holidaysColor?: string
    hasTask?: boolean
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
        disable = false,
        isHoliday = false,
        holidaysColor = colors.HOLIDAYS_COLOR,
        hasTask = false,
        onClick,
    }: Props) => (
        <StyledCell
            $isCurrentMonth={isCurrentMonth}
            $isToday={isToday}
            $isSelected={isSelected}
            $range={range}
            $isWeekend={isWeekend}
            $disable={disable}
            $isHoliday={isHoliday}
            $holidaysColor={holidaysColor}
            $hasTask={hasTask}
            onClick={onClick}
            data-testid='cell'
        >
            <Flex $justifycontent='center' $alignitems='center'>
                <span> {day}</span>
            </Flex>
        </StyledCell>
    )
)
