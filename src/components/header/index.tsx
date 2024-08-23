import React, { memo, ReactElement } from 'react'

import { Flex } from '@styles/flexStyles'
import { NextArrow } from '@ui/nextArrow'
import { PrevArrow } from '@ui/prevArrow'

import { StyledArrow, StyledHeader } from './styled'

type Props = {
    nextArrowClick: VoidFunction
    prevArrowClick: VoidFunction
    isNextArrowDisable: boolean
    isPrevArrowDisable: boolean
    children?: ReactElement
}

export const Header = memo(
    ({ nextArrowClick, prevArrowClick, isNextArrowDisable, isPrevArrowDisable, children }: Props) => (
        <StyledHeader>
            <Flex $alignitems='center'>
                <StyledArrow $disable={isPrevArrowDisable} onClick={prevArrowClick} data-testid='prev-arrow'>
                    <PrevArrow />
                </StyledArrow>
                {children}
                <StyledArrow $disable={isNextArrowDisable} onClick={nextArrowClick} data-testid='next-arrow'>
                    <NextArrow />
                </StyledArrow>
            </Flex>
        </StyledHeader>
    )
)
