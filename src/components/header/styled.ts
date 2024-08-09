import styled from 'styled-components'

import * as colors from '@constants/colors'

export const StyledHeader = styled.header`
    margin-bottom: 5px;
`

export const StyledArrow = styled.div<{ $disable: boolean }>`
    cursor: pointer;
    transition: 0.3s all ease;
    display: flex;
    align-items: center;
    &:hover {
        transform: scale(1.1);
    }

    ${({ $disable }) =>
        $disable &&
        `
        pointer-events: none;
        & svg path{
            fill: ${colors.GRAY};
        }
    `}
`
