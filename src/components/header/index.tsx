import React, { ReactElement } from 'react'
import Flex from '@styles/flexStyles'
import Arrow from '@ui/arrow'

import { StyledArrow, StyledHeader } from './styled'

type Props = {
    nextArrowClick: VoidFunction
    prevArrowClick: VoidFunction
    children?: ReactElement
}

function Header({ nextArrowClick, prevArrowClick, children }: Props) {
    return (
        <StyledHeader>
            <Flex $alignitems='center'>
                <StyledArrow onClick={prevArrowClick}>
                    <Arrow />
                </StyledArrow>
                {children}
                <StyledArrow onClick={nextArrowClick}>
                    <Arrow isNext />
                </StyledArrow>
            </Flex>
        </StyledHeader>
    )
}

export default Header
