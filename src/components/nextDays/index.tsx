import React, { memo, useContext } from 'react'

import { CALENDAR_DAYS_COUNT, MO } from '@constants/magicValues'
import { CellClick } from '@customTypes/cellClickType'
import { Cell } from '@ui/cell'
import { getCountOfDays } from '@utils/getCountOfDays'
import { getCurrent } from '@utils/getCurrent'
import { getDayOfTheWeek } from '@utils/getDayOfTheWeek'
import { getNumbersFromTo } from '@utils/getNumbersFromTo'
import { WithHolidaysContext } from '@utils/hocs/withHolidays'
import { WeekStartsContext } from '@utils/hocs/withWeakStarts'
import { isHolidayToday } from '@utils/isHolidayToday'

type Props = {
    month: number
    year: number
    maxYear: number
    onClick: CellClick
}

export const NextDays = memo(({ month, year, maxYear, onClick }: Props) => {
    const [curMonth, curYear, curDay] = getCurrent()

    const daysInCurentMonth = getCountOfDays(year, month + 1)
    const dayOfTheWeekFirst = getDayOfTheWeek(year, month, 1)

    const { datePickerService } = useContext(WithHolidaysContext)
    const { start } = useContext(WeekStartsContext)
    const countOfNextDays = CALENDAR_DAYS_COUNT - (daysInCurentMonth + dayOfTheWeekFirst - (start === MO ? 1 : 0))
    const nextDays = getNumbersFromTo(1, countOfNextDays)

    return (
        <>
            {nextDays.map(el => (
                <Cell
                    key={el}
                    day={el}
                    isCurrentMonth={false}
                    isToday={el === curDay && month === curMonth - 1 && year === curYear}
                    disable={year >= maxYear && month === 11}
                    isHoliday={
                        datePickerService.getHideHolidays() &&
                        isHolidayToday(month === 11 ? 1 : month + 2, el, datePickerService.getHolidays())
                    }
                    holidaysColor={datePickerService.getHolidaysColor()}
                    onClick={onClick(el, false)}
                />
            ))}
        </>
    )
})
