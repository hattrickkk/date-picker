import styled from 'styled-components'

import * as colors from '@constants/colors'

export const StyledDatepicker = styled.div`
    max-width: 250px;
    position: relative;
`
export const StyledWrapper = styled.div<{ $isOpen: boolean; $rangePicker: boolean }>`
    height: 0;
    overflow: hidden;
    transition: 0.3s all ease;
    background-color: ${colors.WHITE};

    ${({ $isOpen, $rangePicker }) => $isOpen && `height: ${$rangePicker ? 305 : 277}px;`}
`
