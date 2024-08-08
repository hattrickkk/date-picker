import React, { memo, useContext } from 'react'
import { CALENDAR_DAYS_COUNT, MO } from '@constants/magicValues'
import { CellClick } from '@customTypes/cellClickType'
import { Cell } from '@ui/cell'
import { getCountOfDays } from '@utils/getCountOfDays'
import { getCurrent } from '@utils/getCurrent'
import { getDayOfTheWeek } from '@utils/getDayOfTheWeek'
import { WeekStartsContext } from '@utils/hocs/withWeakStarts'

type Props = {
    month: number
    year: number
    onClick: CellClick
}

export const NextDays = memo(({ month, year, onClick }: Props) => {
    const [curMonth, curYear, curDay] = getCurrent()

    const daysInCurentMonth = getCountOfDays(year, month + 1)
    const dayOfTheWeekFirst = getDayOfTheWeek(year, month, 1)

    const { start } = useContext(WeekStartsContext)
    const countOfNextDays = CALENDAR_DAYS_COUNT - (daysInCurentMonth + dayOfTheWeekFirst - (start === MO ? 1 : 0))
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
})
