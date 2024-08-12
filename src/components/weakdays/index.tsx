import React, { memo, useContext } from 'react'

import { DAYS_OF_THE_WEEK } from '@constants/daysOftheWeek'
import { MO, SU } from '@constants/magicValues'
import { Flex } from '@styles/flexStyles'
import { WeekStartsContext } from '@utils/hocs/withWeakStarts'

import { StyledItem } from './styled'

export const Weakdays = memo(() => {
    const { start } = useContext(WeekStartsContext)
    return (
        <Flex>
            {DAYS_OF_THE_WEEK[start === MO ? MO : SU].map(element => (
                <StyledItem key={element}>{element}</StyledItem>
            ))}
        </Flex>
    )
})
