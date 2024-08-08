import styled from 'styled-components'

import * as colors from '@constants/colors'

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 15px;
`
export const Item = styled.button`
    &:hover {
        background-color: ${colors.LIGHT_GRAY};
    }

    background-color: ${colors.WHITE};
    flex: 1 1 25%;
    font-weight: 700;
    font-size: 14px;
    text-align: center;
    padding: 15px 8px;
    cursor: pointer;
    border-radius: 8px;
    transition: 0.3s all ease;
`
