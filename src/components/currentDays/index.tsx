import React, { memo, useContext, useEffect, useState } from 'react'

import { CellClick } from '@customTypes/cellClickType'
import { Cell } from '@ui/cell'
import { getCountOfDays } from '@utils/getCountOfDays'
import { getCurrent } from '@utils/getCurrent'
import { getDayOfTheWeek } from '@utils/getDayOfTheWeek'
import { getNumbersFromTo } from '@utils/getNumbersFromTo'
import { WithHolidaysContext } from '@utils/hocs/withHolidays'
import { isHolidayToday } from '@utils/isHolidayToday'

type Props = {
    month: number
    year: number
    selectedDate: number | null
    onClick: CellClick
    isHighlightWeekends: boolean
}

export const CurrentDays = memo(({ month, year, selectedDate, onClick, isHighlightWeekends }: Props) => {
    const [curMonth, curYear, curDay] = getCurrent()
    const { datePickerService } = useContext(WithHolidaysContext)

    const daysInCurentMonth = getCountOfDays(year, month + 1)
    const currentDays = getNumbersFromTo(1, daysInCurentMonth)

    return (
        <>
            {currentDays.map((el, i) => (
                <Cell
                    key={el}
                    day={el}
                    isWeekend={
                        isHighlightWeekends &&
                        (getDayOfTheWeek(year, month, el) === 0 || getDayOfTheWeek(year, month, el) === 6)
                    }
                    isSelected={selectedDate === i + 1}
                    isToday={el === curDay && month === curMonth && year === curYear}
                    isHoliday={
                        datePickerService.getHideHolidays() &&
                        isHolidayToday(month + 1, el, datePickerService.getHolidays())
                    }
                    holidaysColor={datePickerService.getHolidaysColor()}
                    onClick={onClick(el)}
                />
            ))}
        </>
    )
})
