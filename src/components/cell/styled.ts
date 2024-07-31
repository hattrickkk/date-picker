import * as colors from '@constants/colors'
import styled from 'styled-components'

type Props = {
    $isCurrentMonth: boolean
    $isToday: boolean
    $isSelected: boolean
    $range: string
}

const StyledCell = styled.div<Props>`
    width: 32px;
    height: 32px;
    border-radius: 8px;
    padding: 8px;
    color: ${({ $isCurrentMonth }) => ($isCurrentMonth ? colors.BLACK : colors.GRAY)};

    ${({ $isToday }) =>
        $isToday &&
        `color: ${colors.BLACK};
        border: 1.5px solid ${colors.BLUE};
    `}

    ${({ $isSelected }) =>
        $isSelected &&
        `color: ${colors.WHITE};
        background-color: ${colors.BLUE};
    `}

    ${({ $range }) => {
        switch ($range) {
            case 'start':
                return `
                    border-radius: 8px 0 0 8px;
                    color: ${colors.WHITE};
                    background-color: ${colors.LIGHT_BLUE};
                `
            case 'end':
                return `
                    border-radius: 0 8px 8px 0;
                    color: ${colors.WHITE};
                    background-color: ${colors.BLUE};
                `
            case 'middle':
                return `
                    border-radius: 0;
                    color: ${colors.BLUE};
                    background-color: ${colors.RANGE_BLUE};
                `
            default:
                break
        }
    }}
`
export default StyledCell
