import styled from 'styled-components'

import * as colors from '@constants/colors'

export const Modal = styled.div`
    position: absolute;
    left: 260px;
    width: 240px;
    top: 50px;
    height: 267px;
    padding: 10px 15px;
    border: 1px solid ${colors.BORDER_GRAY};
    border-radius: 8px;
    background-color: ${colors.WHITE};
`
export const Date = styled.p`
    font-weight: 600;
    font-size: 12px;
    padding: 3px 3px 6px 0;
`
