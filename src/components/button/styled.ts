import styled from 'styled-components'

const StyledButton = styled.div<{ $primary: boolean; $size: string; $bg: string }>`
    font-size: 20px;
    padding: 13px 20px;
    border-radius: 5px;
    transition: all linear 0.3s;
    border: 3px solid blue;

    background-color: ${({ $primary }) => ($primary ? 'blue' : 'white')};
    color: ${({ $primary }) => ($primary ? 'white' : 'blue')};

    height: ${({ $size }) => ($size === 'small' ? '50' : '100')}px;

    background-color: ${({ $bg }) => $bg};
`
export default StyledButton
