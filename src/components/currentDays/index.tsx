import React from 'react'
import Cell from '@ui/cell'
import getCountOfDays from '@utils/getCountOfDays'
import getCurrent from '@utils/getCurrent'
import CellClick from 'src/customTypes/cellClickType'

type Props = {
    month: number
    year: number
    selectedDate: number | null
    onClick: CellClick
}

function PrevDays({ month, year, selectedDate, onClick }: Props) {
    const [curMonth, curYear, curDay] = getCurrent()

    const daysInCurentMonth = getCountOfDays(year, month + 1)
    const currentDays = []
    for (let i = 1; i <= daysInCurentMonth; i++) {
        currentDays.push(i)
    }

    return (
        <>
            {currentDays.map((el, i) => (
                <Cell
                    key={el}
                    day={el}
                    isSelected={selectedDate === i + 1}
                    isToday={el === curDay && month === curMonth && year === curYear}
                    onClick={onClick(el)}
                />
            ))}
        </>
    )
}

export default React.memo(PrevDays)
