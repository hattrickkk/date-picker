import React, { memo, ReactElement } from 'react'

import { Flex } from '@styles/flexStyles'
import { Arrow } from '@ui/arrow'

import { StyledArrow, StyledHeader } from './styled'

type Props = {
    nextArrowClick: VoidFunction
    prevArrowClick: VoidFunction
    nextArrowDisable: boolean
    prevArrowDisable: boolean
    children?: ReactElement
}

export const Header = memo(
    ({ nextArrowClick, prevArrowClick, nextArrowDisable, prevArrowDisable, children }: Props) => (
        <StyledHeader>
            <Flex $alignitems='center'>
                <StyledArrow $disable={prevArrowDisable} onClick={prevArrowClick} data-testid='prev-arrow'>
                    <Arrow />
                </StyledArrow>
                {children}
                <StyledArrow $disable={nextArrowDisable} onClick={nextArrowClick} data-testid='next-arrow'>
                    <Arrow isNext />
                </StyledArrow>
            </Flex>
        </StyledHeader>
    )
)
