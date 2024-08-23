import React, { memo, useContext } from 'react'

import { CALENDAR_DAYS_COUNT, LAST_MONTH, MO } from '@constants/magicValues'
import { OnCellClick } from '@customTypes/cellClickType'
import { Cell } from '@ui/cell'
import { getCountOfDays } from '@utils/getCountOfDays'
import { getCurrent } from '@utils/getCurrent'
import { getDateforInput } from '@utils/getDateForInput'
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
    maxYear: number
    onClick: OnCellClick
    taskDays: string[]
}

export const NextDays = memo(({ month, year, maxYear, onClick, taskDays }: Props) => {
    const [curMonth, curYear, curDay] = getCurrent()

    const daysInCurentMonth = getCountOfDays({ year, month: month + 1, day: 0 })
    const dayOfTheWeekFirst = getDayOfTheWeek({ year, month, day: 1 })

    const { datePickerService } = useContext(WithHolidaysContext)
    const { start } = useContext(WeekStartsContext)
    const countOfNextDays = CALENDAR_DAYS_COUNT - (daysInCurentMonth + dayOfTheWeekFirst - (start === MO ? 1 : 0))
    const nextDays = getNumbersFromTo(1, countOfNextDays)

    const { rangeStart, rangeEnd } = useContext(WithRangeContext)

    return (
        <>
            {nextDays.map(element => (
                <Cell
                    key={element}
                    day={element}
                    isCurrentMonth={false}
                    isToday={element === curDay && month === curMonth - 1 && year === curYear}
                    disable={year >= maxYear && month === LAST_MONTH}
                    isHoliday={
                        datePickerService.getHideHolidays() &&
                        isHolidayToday(
                            { year, month: month === LAST_MONTH ? 1 : month + 2, day: element },
                            datePickerService.getHolidays()
                        )
                    }
                    holidaysColor={datePickerService.getHolidaysColor()}
                    range={getRangeValue(rangeStart, rangeEnd, { year, month: month + 1, day: element })}
                    hasTask={taskDays.includes(getDateforInput({ day: element, month: month + 2, year: curYear }))}
                    onClick={onClick(element, false)}
                />
            ))}
        </>
    )
})
