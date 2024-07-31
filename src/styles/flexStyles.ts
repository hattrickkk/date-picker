import styled from 'styled-components'

type FlexPropsType = Partial<{
    $justifycontent: string
    $flexdirection: string
    $flexwrap: string
    $alignitems: string
    $gap: number
}>

const Flex = styled.div<FlexPropsType>`
    display: flex;
    flex-direction: ${props => props.$flexdirection || ' row'};
    flex-wrap: ${props => props.$flexwrap || ' no-wrap'};
    justify-content: ${props => props.$justifycontent || 'space-between'};
    align-items: ${props => props.$alignitems || ' stretch'};
`
export default Flex
