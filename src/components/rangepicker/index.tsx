import React from 'react'

import Datepicker from '@components/datepicker'
import { Flex } from '@styles/flexStyles'
import { withRange } from '@utils/hocs/withRange'

import { Text, Wrapper } from './styled'

const Rangepicker = () => (
    <Wrapper>
        <Flex $flexdirection='column'>
            <Text>From:</Text>
            <Datepicker isRangePicker isFromInput />
        </Flex>
        <Flex $flexdirection='column'>
            <Text>To:</Text>
            <Datepicker isRangePicker />
        </Flex>
    </Wrapper>
)

export default withRange(Rangepicker)
