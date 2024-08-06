import React from 'react'
import { CALENDAR_DAYS_COUNT } from '@constants/magicValues'
import CellClick from '@customTypes/cellClickType'
import Cell from '@ui/cell'
import getCountOfDays from '@utils/getCountOfDays'
import getCurrent from '@utils/getCurrent'

type Props = {
    month: number
    year: number
    onClick: CellClick
}

function NextDays({ month, year, onClick }: Props) {
    const [curMonth, curYear, curDay] = getCurrent()

    const daysInCurentMonth = getCountOfDays(year, month + 1)
    const dayOfTheWeekFirst = new Date(year, month, 1).getDay()

    const countOfNextDays = CALENDAR_DAYS_COUNT - (daysInCurentMonth + dayOfTheWeekFirst)
    const nextDays = []
    for (let i = 1; i <= countOfNextDays; i++) {
        nextDays.push(i)
    }

    return (
        <>
            {nextDays.map(el => (
                <Cell
                    isCurrentMonth={false}
                    key={el}
                    day={el}
                    isToday={el === curDay && month === curMonth - 1 && year === curYear}
                    onClick={onClick(el, false)}
                />
            ))}
        </>
    )
}

export default React.memo(NextDays)
