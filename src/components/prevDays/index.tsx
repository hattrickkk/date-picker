import React, { memo, useContext } from 'react'

import { FIRST_MONTH, LAST_MONTH, MO } from '@constants/magicValues'
import { CellClick } from '@customTypes/cellClickType'
import { Cell } from '@ui/cell'
import { getCountOfDays } from '@utils/getCountOfDays'
import { getCurrent } from '@utils/getCurrent'
import { getDayOfTheWeek } from '@utils/getDayOfTheWeek'
import { getNumbersFromTo } from '@utils/getNumbersFromTo'
import { WithHolidaysContext } from '@utils/hocs/withHolidays'
import { WithRangeContext } from '@utils/hocs/withRange'
import { WeekStartsContext } from '@utils/hocs/withWeakStarts'
import { isHolidayToday } from '@utils/isHolidayToday'
import { getRangeValue } from '@utils/rangePicker/getRangeValue'

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

    const { rangeStart, rangeEnd } = useContext(WithRangeContext)

    return (
        <>
            {prevDays.map(element => (
                <Cell
                    key={element}
                    day={element}
                    isCurrentMonth={false}
                    isToday={element === curDay && month === curMonth + 1 && year === curYear}
                    disable={year <= minYear && month === FIRST_MONTH}
                    isHoliday={
                        datePickerService.getHideHolidays() &&
                        isHolidayToday(
                            month === FIRST_MONTH ? LAST_MONTH + 1 : month,
                            element,
                            datePickerService.getHolidays()
                        )
                    }
                    holidaysColor={datePickerService.getHolidaysColor()}
                    range={getRangeValue(rangeStart, rangeEnd, year, month - 1, element)}
                    onClick={onClick(element, false)}
                />
            ))}
        </>
    )
})
