import React, { memo, useCallback } from 'react'

import { CALENDAR_YEARS_COUNT } from '@constants/magicValues'
import { PickerItems } from '@ui/pickerItems'
import { getNumbersFromTo } from '@utils/getNumbersFromTo'

type Props = {
    setYear: React.Dispatch<React.SetStateAction<number>>
    closeYearPicker: VoidFunction
    year: number
}

export const YearPicker = memo(({ setYear, closeYearPicker, year }: Props) => {
    const itemClickHandler = useCallback(
        (el: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            setYear(el)
            closeYearPicker()
        },
        []
    )

    const years = getNumbersFromTo(year, year + CALENDAR_YEARS_COUNT)

    return <PickerItems elements={years} onClick={itemClickHandler} />
})
