import React, { memo } from 'react'
import { CellClick } from '@customTypes/cellClickType'
import { Cell } from '@ui/cell'
import { getCountOfDays } from '@utils/getCountOfDays'
import { getCurrent } from '@utils/getCurrent'
import { getDayOfTheWeek } from '@utils/getDayOfTheWeek'

type Props = {
    month: number
    year: number
    selectedDate: number | null
    onClick: CellClick
    isHighlightWeekends: boolean
}

export const CurrentDays = memo(({ month, year, selectedDate, onClick, isHighlightWeekends }: Props) => {
    const [curMonth, curYear, curDay] = getCurrent()

    const daysInCurentMonth = getCountOfDays(year, month + 1)
    const currentDays = []
    for (let i = 1; i <= daysInCurentMonth; i++) {
        currentDays.push(i)
    }

    return (
        <>
            {currentDays.map((el, i) => (
                <Cell
                    isWeekend={
                        isHighlightWeekends &&
                        (getDayOfTheWeek(year, month, el) === 0 || getDayOfTheWeek(year, month, el) === 6)
                    }
                    key={el}
                    day={el}
                    isSelected={selectedDate === i + 1}
                    isToday={el === curDay && month === curMonth && year === curYear}
                    onClick={onClick(el)}
                />
            ))}
        </>
    )
})
