import styled from 'styled-components'

import * as colors from '@constants/colors'

export const StyledWrapper = styled.div`
    position: relative;
`
export const StyledCloseIcon = styled.div`
    &:hover {
        transform: scale(1.1);
    }

    cursor: pointer;
    position: absolute;
    right: 16px;
    top: 13px;
    transition: all 0.3s ease;
`

export const StyledCalendarIcon = styled.div`
    position: absolute;
    left: 15px;
    top: 11px;
    pointer-events: none;
`

export const StyledInput = styled.input`
    border: 1px solid ${colors.BORDER_GRAY};
    border-radius: 8px;
    padding: 11px 35px;
    font-size: 15px;
    width: 100%;
`
