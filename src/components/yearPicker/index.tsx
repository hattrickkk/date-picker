import React, { useCallback } from 'react'
import { CALENDAR_YEARS_COUNT } from '@constants/magicValues'
import PickerItems from '@ui/pickerItems'

type Props = {
    setYear: React.Dispatch<React.SetStateAction<number>>
    closeYearPicker: VoidFunction
    year: number
}

function YearPicker({ setYear, closeYearPicker, year }: Props) {
    const itemClickHandler = useCallback(
        (el: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            setYear(el)
            closeYearPicker()
        },
        []
    )

    const years: number[] = []
    for (let i = year; i < year + CALENDAR_YEARS_COUNT; i++) {
        years.push(i)
    }

    return <PickerItems elements={years} onClick={itemClickHandler} />
}

export default React.memo(YearPicker)
