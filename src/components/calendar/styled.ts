import * as colors from '@constants/colors'
import styled from 'styled-components'

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
