import styled from 'styled-components'

import * as colors from '@constants/colors'

export const StyledCalendar = styled.div`
    margin-top: 8px;
    padding: 10px;
    border: 1px solid ${colors.BORDER_GRAY};
    border-radius: 8px;
    position: relative;
`
export const StyledText = styled.span`
    &:first-child {
        margin-right: 10px;
    }

    cursor: pointer;
    font-weight: 700;
    font-size: 14px;
`
export const Wrapper = styled.div`
    position: absolute;
    background-color: ${colors.WHITE};
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    padding: 10px;
    border-radius: 10px;
`
export const Clear = styled.button`
    font-weight: 600;
    font-size: 12px;
    background-color: ${colors.WHITE};
    padding: 10px;
    outline: 1.5px solid ${colors.BORDER_GRAY};
    border-radius: 0 0 8px 8px;
    margin-top: 5px;
    width: 100%;
    position: absolute;
    left: 0px;
    transition: 0.3s all ease;

    &:focus {
        outline: 1.5px solid ${colors.BORDER_GRAY};
    }

    &:hover {
        background-color: ${colors.LIGHT_GRAY};
    }
`
