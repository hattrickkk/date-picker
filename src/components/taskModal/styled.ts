import styled from 'styled-components'

import * as colors from '@constants/colors'

export const Modal = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50px;
    height: 267px;
    padding: 10px 15px 15px;
    border: 1px solid ${colors.BORDER_GRAY};
    border-radius: 8px;
    background-color: ${colors.WHITE};
`
export const Date = styled.p`
    font-weight: 600;
    font-size: 12px;
`
export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 5px 0 10px;
`

export const Wrapper = styled.div`
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
    }
`
