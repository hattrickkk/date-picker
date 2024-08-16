import React, { memo, useCallback, useContext } from 'react'

import { CALENDAR_YEARS_COUNT } from '@constants/magicValues'
import { PickerItems } from '@ui/pickerItems'
import { getDateforInput } from '@utils/getDateForInput'
import { getNumbersFromTo } from '@utils/getNumbersFromTo'
import { WithUserDateRedirectContext } from '@utils/hocs/withUserDateRedirect'

type Props = {
    setYear: React.Dispatch<React.SetStateAction<number>>
    closeYearPicker: VoidFunction
    year: number
    isRangePicker: boolean
}

export const YearPicker = memo(({ setYear, closeYearPicker, year, isRangePicker }: Props) => {
    const { inputValue, setInputValue } = useContext(WithUserDateRedirectContext)
    const itemClickHandler = useCallback(
        (element: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            setYear(element)
            if (inputValue && !isRangePicker) {
                const [day, month] = inputValue.split('/').map(Number)
                setInputValue(getDateforInput({ day, month, year: element }))
            }
            closeYearPicker()
        },
        []
    )

    const years = getNumbersFromTo(year, year + CALENDAR_YEARS_COUNT)

    return <PickerItems elements={years} onClick={itemClickHandler} />
})
