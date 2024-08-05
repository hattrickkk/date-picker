import styled from 'styled-components'

export const StyledHeader = styled.header`
    margin-bottom: 5px;
`

export const StyledArrow = styled.div`
    cursor: pointer;
    transition: 0.3s all ease;
    display: flex;
    align-items: center;
    &:hover {
        transform: scale(1.1);
    }
`

export const StyledText = styled.span`
    &:first-child {
        margin-right: 10px;
    }

    font-weight: 700;
    font-size: 14px;
`
