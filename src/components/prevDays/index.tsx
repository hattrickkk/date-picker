import React, { useContext } from 'react'
import { MO } from '@constants/magicValues'
import CellClick from '@customTypes/cellClickType'
import Cell from '@ui/cell'
import getCountOfDays from '@utils/getCountOfDays'
import getCurrent from '@utils/getCurrent'
import getDayOfTheWeek from '@utils/getDayOfTheWeek'
import { WeekStartsContext } from '@utils/hocs/withWeakStarts'

type Props = {
    month: number
    year: number
    onClick: CellClick
}

function PrevDays({ month, year, onClick }: Props) {
    const [curMonth, curYear, curDay] = getCurrent()

    const daysInPrevMonth = getCountOfDays(year, month)
    const dayOfTheWeekFirst = getDayOfTheWeek(year, month, 1)
    const prevDays = []

    const { start } = useContext(WeekStartsContext)
    for (let i = daysInPrevMonth - dayOfTheWeekFirst + (start === MO ? 2 : 1); i <= daysInPrevMonth; i++) {
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
