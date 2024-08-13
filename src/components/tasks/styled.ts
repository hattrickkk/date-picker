import styled from 'styled-components'

import * as colors from '@constants/colors'

export const StyledInput = styled.input`
    border: 1px solid ${colors.GRAY};
    border-radius: 7px;
    padding: 6px 8px;
    width: 100%;
`

export const AddButton = styled.button<{ $disabled: boolean }>`
    border: 1px solid ${colors.LIGHT_BLUE};
    color: ${colors.BLUE};
    background-color: ${colors.WHITE};
    margin-left: 7px;
    border-radius: 5px;
    padding: 6px 12px;
    transition: 0.3s all ease;

    &:hover {
        color: ${colors.WHITE};
        background-color: ${colors.LIGHT_BLUE};
    }

    &:active {
        background-color: ${colors.BLUE};
    }

    ${({ $disabled }) =>
        $disabled &&
        `pointer-events: none;
        background-color: ${colors.BORDER_GRAY};
        color: ${colors.GRAY};
        border: 1px solid ${colors.GRAY}; 
    `}
`

export const Wrapper = styled.div`
    max-height: 172px;
    overflow-y: scroll;
    margin-top: 15px;

    &::-webkit-scrollbar {
        width: 7px;
    }

    &::-webkit-scrollbar-track {
        background: ${colors.WHITE};
    }

    &::-webkit-scrollbar-thumb {
        background: ${colors.GRAY};
        border-radius: 3px;
    }
`

export const Title = styled.h2`
    font-weight: 600;
    margin-bottom: 5px;
`

export const TaskBlock = styled.div`
    &:not(:last-child) {
        margin-bottom: 15px;
    }
`
