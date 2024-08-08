import React, { memo, useContext } from 'react'

import { MO } from '@constants/magicValues'
import { CellClick } from '@customTypes/cellClickType'
import { Cell } from '@ui/cell'
import { getCountOfDays } from '@utils/getCountOfDays'
import { getCurrent } from '@utils/getCurrent'
import { getDayOfTheWeek } from '@utils/getDayOfTheWeek'
import { getNumbersFromTo } from '@utils/getNumbersFromTo'
import { WeekStartsContext } from '@utils/hocs/withWeakStarts'

type Props = {
    month: number
    year: number
    minYear: number
    onClick: CellClick
}

export const PrevDays = memo(({ month, year, onClick, minYear }: Props) => {
    const [curMonth, curYear, curDay] = getCurrent()

    const daysInPrevMonth = getCountOfDays(year, month)
    const dayOfTheWeekFirst = getDayOfTheWeek(year, month, 1)

    const { start } = useContext(WeekStartsContext)
    const firstDayOfPrevMonth = daysInPrevMonth - dayOfTheWeekFirst + (start === MO ? 2 : 1)
    const prevDays = getNumbersFromTo(firstDayOfPrevMonth, daysInPrevMonth)

    return (
        <>
            {prevDays.map(el => (
                <Cell
                    isCurrentMonth={false}
                    key={el}
                    day={el}
                    isToday={el === curDay && month === curMonth + 1 && year === curYear}
                    disable={year <= minYear && month === 0}
                    onClick={onClick(el, false)}
                />
            ))}
        </>
    )
})
