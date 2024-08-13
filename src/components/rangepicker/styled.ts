import styled from 'styled-components'

export const Text = styled.p`
    font-size: 15px;
    padding: 0 0 10px 7px;
`
export const Wrapper = styled.div`
    & > *:not(:last-child) {
        margin-bottom: 20px;
    }
`
