import React from 'react'
import Cell from '@ui/cell'
import getCountOfDays from '@utils/getCountOfDays'
import getCurrent from '@utils/getCurrent'
import CellClick from 'src/customTypes/cellClickType'

type Props = {
    month: number
    year: number
    onClick: CellClick
}

function PrevDays({ month, year, onClick }: Props) {
    const [curMonth, curYear, curDay] = getCurrent()

    const daysInPrevMonth = getCountOfDays(year, month)
    const dayOfTheWeekFirst = new Date(year, month, 1).getDay()
    const prevDays = []

    for (let i = daysInPrevMonth - dayOfTheWeekFirst + 1; i <= daysInPrevMonth; i++) {
        prevDays.push(i)
    }

    return (
        <>
            {prevDays.map(el => (
                <Cell
                    isCurrentMonth={false}
                    key={el}
                    day={el}
                    isToday={el === curDay && month === curMonth + 1 && year === curYear}
                    onClick={onClick(el, false)}
                />
            ))}
        </>
    )
}

export default React.memo(PrevDays)
