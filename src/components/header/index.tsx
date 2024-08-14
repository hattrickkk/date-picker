import React, { memo, ReactElement } from 'react'

import { Flex } from '@styles/flexStyles'
import { Arrow } from '@ui/arrow'

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
                <StyledArrow $disable={isPrevArrowDisable} onClick={prevArrowClick}>
                    <Arrow />
                </StyledArrow>
                {children}
                <StyledArrow $disable={isNextArrowDisable} onClick={nextArrowClick}>
                    <Arrow isNext />
                </StyledArrow>
            </Flex>
        </StyledHeader>
    )
)
