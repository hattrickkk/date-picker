import styled from 'styled-components'

export const StyledDatepicker = styled.div`
    max-width: 250px;
`
export const StyledWrapper = styled.div<{ $isOpen: boolean }>`
    height: 0;
    overflow: hidden;
    transition: 0.3s all ease;

    ${({ $isOpen }) => $isOpen && `height: 277px;`}
`
