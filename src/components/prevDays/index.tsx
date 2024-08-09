import React, { memo, useContext } from 'react'

import { MO } from '@constants/magicValues'
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
    minYear: number
    onClick: CellClick
}

export const PrevDays = memo(({ month, year, onClick, minYear }: Props) => {
    const [curMonth, curYear, curDay] = getCurrent()
    const { datePickerService } = useContext(WithHolidaysContext)

    const daysInPrevMonth = getCountOfDays(year, month)
    const dayOfTheWeekFirst = getDayOfTheWeek(year, month, 1)

    const { start } = useContext(WeekStartsContext)
    const firstDayOfPrevMonth = daysInPrevMonth - dayOfTheWeekFirst + (start === MO ? 2 : 1)
    const prevDays = getNumbersFromTo(firstDayOfPrevMonth, daysInPrevMonth)

    return (
        <>
            {prevDays.map(el => (
                <Cell
                    key={el}
                    day={el}
                    isCurrentMonth={false}
                    isToday={el === curDay && month === curMonth + 1 && year === curYear}
                    disable={year <= minYear && month === 0}
                    isHoliday={
                        datePickerService.getHideHolidays() &&
                        isHolidayToday(month === 0 ? 12 : month, el, datePickerService.getHolidays())
                    }
                    holidaysColor={datePickerService.getHolidaysColor()}
                    onClick={onClick(el, false)}
                />
            ))}
        </>
    )
})
