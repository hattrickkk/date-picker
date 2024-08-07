import React, { useContext } from 'react'
import DAYS_OF_THE_WEEK from '@constants/daysOftheWeek'
import { MO, SU } from '@constants/magicValues'
import Flex from '@styles/flexStyles'
import { WeekStartsContext } from '@utils/hocs/withWeakStarts'

import StyledItem from './styled'

function Weakdays() {
    const { start } = useContext(WeekStartsContext)
    return (
        <Flex>
            {DAYS_OF_THE_WEEK[start === MO ? MO : SU].map(el => (
                <StyledItem key={el}>{el}</StyledItem>
            ))}
        </Flex>
    )
}

export default React.memo(Weakdays)
