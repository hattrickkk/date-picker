import React from 'react'

import Datepicker from '@components/datepicker'
import { Common } from '@customTypes/common'
import { Flex } from '@styles/flexStyles'
import { GlobalStyles } from '@styles/global'
import { NullStyles } from '@styles/nullStyles'
import { withRange } from '@utils/hocs/withRange'

import { Text, Wrapper } from './styled'

const RangePicker = ({ minYear, maxYear, weekStarts, hideHolidays, holidaysColor, isHighlightWeekends }: Common) => (
    <>
        <NullStyles />
        <GlobalStyles />
        <Wrapper>
            <Flex $flexdirection='column'>
                <Text>From:</Text>
                <Datepicker
                    isRangePicker
                    isFromInput
                    minYear={minYear}
                    maxYear={maxYear}
                    weekStarts={weekStarts}
                    hideHolidays={hideHolidays}
                    holidaysColor={holidaysColor}
                    isHighlightWeekends={isHighlightWeekends}
                />
            </Flex>
            <Flex $flexdirection='column'>
                <Text>To:</Text>
                <Datepicker
                    isRangePicker
                    minYear={minYear}
                    maxYear={maxYear}
                    weekStarts={weekStarts}
                    hideHolidays={hideHolidays}
                    holidaysColor={holidaysColor}
                    isHighlightWeekends={isHighlightWeekends}
                />
            </Flex>
        </Wrapper>
    </>
)

export default withRange(RangePicker)
