import styled from 'styled-components'

import * as colors from '@constants/colors'

type Props = {
    $isCurrentMonth: boolean
    $isToday: boolean
    $isSelected: boolean
    $range: string
    $isWeekend: boolean
    $disable: boolean
    $isHoliday: boolean
    $holidaysColor: string
    $hasTask: boolean
}

export const StyledCell = styled.div<Props>`
    width: 32px;
    height: 32px;
    border-radius: 8px;
    padding: 8px;
    transition: 0.3s all ease;
    cursor: pointer;

    color: ${({ $isWeekend, $isCurrentMonth }) =>
        $isWeekend ? colors.RED : $isCurrentMonth ? colors.BLACK : colors.GRAY};

    &:hover {
        background-color: ${colors.LIGHT_GRAY};
    }

    ${({ $disable }) => $disable && ` pointer-events: none;`}

    ${({ $isToday }) =>
        $isToday &&
        `color: ${colors.BLACK};
        border: 1.5px solid ${colors.GRAY};
    `}

    ${({ $isHoliday, $holidaysColor }) =>
        $isHoliday &&
        ` 
            &:hover{
                background-color: ${$holidaysColor}
            }
            background-color: ${$holidaysColor};
        `}

    ${({ $hasTask }) =>
        $hasTask &&
        `position: relative;

        &:before{
            content: '';
            width: 4px;
            height: 4px;
            border-radius: 10px;
            background-color: ${colors.LIGHT_BLUE};
            position: absolute;
            right:4px;
            top:4px;
        }

    `}

    ${({ $isSelected }) =>
        $isSelected &&
        `
        &:hover{
            background-color: ${colors.BLUE};
        }

        color: ${colors.WHITE};
        background-color: ${colors.BLUE};
        border: 1.5px solid ${colors.BLUE};
        transition: 0s;
    `}

    ${({ $range }) => {
        switch ($range) {
            case 'start':
                return `
                    &:hover {
                        background-color: ${colors.LIGHT_BLUE};
                    }

                    border: 1.5px solid ${colors.LIGHT_BLUE};
                    border-radius: 8px 0 0 8px;
                    color: ${colors.WHITE};
                    background-color: ${colors.LIGHT_BLUE};
                `
            case 'end':
                return `
                    &:hover {
                        background-color: ${colors.BLUE};
                    }
                    border-radius: 0 8px 8px 0;
                    color: ${colors.WHITE};
                    background-color: ${colors.BLUE};
                `
            case 'middle':
                return `
                    border: none;
                    border-radius: 0;
                    color: ${colors.BLUE};
                    background-color: ${colors.RANGE_BLUE};
                `
            default:
                break
        }
    }}
`
