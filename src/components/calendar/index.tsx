import React, { useState } from 'react'
import CurrentDays from '@components/currentDays'
import Header from '@components/header'
import NextDays from '@components/nextDays'
import PrevDays from '@components/prevDays'
import Weakdays from '@components/weakdays'
import { HALF_OF_THE_MONTH } from '@constants/magicValues'
import Flex from '@styles/flexStyles'
import getCurrent from '@utils/getCurrent'

import StyledCalendar from './styled'

function Calendar() {
    const [month, setMonth] = useState(() => getCurrent()[0])
    const [year, setYear] = useState(() => getCurrent()[1])
    const [selectedDate, setSelectedDate] = useState<null | number>(null)

    const next = () => {
        if (month === 10) {
            setMonth(0)
            setYear(year + 1)
        } else {
            setMonth(month + 1)
        }
    }

    const prev = () => {
        if (month === 0) {
            setMonth(11)
            setYear(year - 1)
        } else {
            setMonth(month - 1)
        }
    }

    const cellClick =
        (day: number, isCurrent: boolean = true) =>
        () => {
            if (!isCurrent) {
                day < HALF_OF_THE_MONTH ? next() : prev()
            }
            setSelectedDate(selectedDate === day ? null : day)
        }

    return (
        <StyledCalendar>
            <Header nextArrowClick={next} prevArrowClick={prev} month={month} year={year} />
            <Weakdays />
            <Flex $flexwrap='wrap'>
                <PrevDays month={month} year={year} onClick={cellClick} />
                <CurrentDays month={month} year={year} onClick={cellClick} selectedDate={selectedDate} />
                <NextDays month={month} year={year} onClick={cellClick} />
            </Flex>
        </StyledCalendar>
    )
}

export default Calendar
