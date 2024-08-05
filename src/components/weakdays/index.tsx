import React from 'react'
import DAYS_OF_THE_WEEK from '@constants/daysOftheWeek'
import Flex from '@styles/flexStyles'

import StyledItem from './styled'

function Weakdays() {
    return (
        <Flex>
            {DAYS_OF_THE_WEEK.map(el => (
                <StyledItem key={el}>{el}</StyledItem>
            ))}
        </Flex>
    )
}

export default Weakdays
