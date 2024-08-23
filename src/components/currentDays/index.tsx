import React, { memo, useContext } from 'react'

import { SATURDAY_INDEX, SUNDAY_INDEX } from '@constants/magicValues'
import { OnCellClick } from '@customTypes/cellClickType'
import { Cell } from '@ui/cell'
import { getCountOfDays } from '@utils/getCountOfDays'
import { getCurrent } from '@utils/getCurrent'
import { getDateforInput } from '@utils/getDateForInput'
import { getDayOfTheWeek } from '@utils/getDayOfTheWeek'
import { getNumbersFromTo } from '@utils/getNumbersFromTo'
import { WithHolidaysContext } from '@utils/hocs/withHolidays'
import { WithRangeContext } from '@utils/hocs/withRange'
import { isHolidayToday } from '@utils/isHolidayToday'
import { getRangeValue } from '@utils/rangePicker/getRangeValue'

type Props = {
    month: number
    year: number
    selectedDate: number | null
    onClick: OnCellClick
    isHighlightWeekends: boolean
    taskDays: string[]
}

export const CurrentDays = memo(({ month, year, selectedDate, onClick, isHighlightWeekends, taskDays }: Props) => {
    const [curMonth, curYear, curDay] = getCurrent()
    const { datePickerService } = useContext(WithHolidaysContext)

    const daysInCurentMonth = getCountOfDays({ year, month: month + 1, day: 0 })
    const currentDays = getNumbersFromTo(1, daysInCurentMonth)
    const { rangeStart, rangeEnd } = useContext(WithRangeContext)

    return (
        <>
            {currentDays.map((element, index) => (
                <Cell
                    key={element}
                    day={element}
                    isWeekend={
                        isHighlightWeekends &&
                        (getDayOfTheWeek({ year, month, day: element }) === SUNDAY_INDEX ||
                            getDayOfTheWeek({ year, month, day: element }) === SATURDAY_INDEX)
                    }
                    isSelected={selectedDate === index + 1}
                    isToday={element === curDay && month === curMonth && year === curYear}
                    isHoliday={
                        datePickerService.getHideHolidays() &&
                        isHolidayToday({ year, month: month + 1, day: element }, datePickerService.getHolidays())
                    }
                    holidaysColor={datePickerService.getHolidaysColor()}
                    range={getRangeValue(rangeStart, rangeEnd, { year, month, day: element })}
                    hasTask={taskDays.includes(getDateforInput({ day: element, month: month + 1, year: curYear }))}
                    onClick={onClick(element)}
                />
            ))}
        </>
    )
})
