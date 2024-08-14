import styled from 'styled-components'

import * as colors from '@constants/colors'

export const Item = styled.li`
    padding: 3px 0;
    position: relative;
`
export const TaskTitle = styled.p<{ $completed: boolean }>`
    ${({ $completed }) => $completed && `text-decoration: line-through;`}
    flex: 1 1 auto;
    padding: 0 10px 0;
    max-width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const RemoveIcon = styled.div`
    cursor: pointer;

    &:after,
    &:before {
        content: '';
        background-color: ${colors.RED};
        width: 10px;
        height: 1.5px;
        position: absolute;
        right: 10px;
        top: 50%;
    }

    &:after {
        transform: rotate(45deg);
    }

    &:before {
        transform: rotate(-45deg);
    }
`
