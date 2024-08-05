import React, { useState } from 'react'
import Arrow from '@components/arrow'
import MONTHS from '@constants/month'
import Flex from '@styles/flexStyles'
import GlobalStyles from '@styles/global'
import NullStyles from '@styles/nullStyles'

import { StyledArrow, StyledHeader, StyledText } from './styled'

type Props = {
    month: number
    year: number
    nextArrowClick: VoidFunction
    prevArrowClick: VoidFunction
}

function Header({ month, year, nextArrowClick, prevArrowClick }: Props) {
    return (
        <>
            <GlobalStyles />
            <NullStyles />
            <StyledHeader>
                <Flex $alignitems='center'>
                    <StyledArrow onClick={prevArrowClick}>
                        <Arrow />
                    </StyledArrow>
                    <Flex $alignitems='center'>
                        <StyledText> {MONTHS[month]} </StyledText>
                        <StyledText> {year}</StyledText>
                    </Flex>

                    <StyledArrow onClick={nextArrowClick}>
                        <Arrow isNext />
                    </StyledArrow>
                </Flex>
            </StyledHeader>
        </>
    )
}

export default Header
