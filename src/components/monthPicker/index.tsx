import React, { memo, useCallback, useContext } from 'react'

import { MONTHS } from '@constants/month'
import { PickerItems } from '@ui/pickerItems'
import { getDateforInput } from '@utils/getDateForInput'
import { WithUserDateRedirectContext } from '@utils/hocs/withUserDateRedirect'

type Props = {
    setMonth: React.Dispatch<React.SetStateAction<number>>
    closeMonthPicker: VoidFunction
    isRangePicker: boolean
}

export const MonthPicker = memo(({ setMonth, closeMonthPicker, isRangePicker }: Props) => {
    const { inputValue, setInputValue } = useContext(WithUserDateRedirectContext)
    const itemClickHandler = useCallback(
        (element: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            setMonth(element)
            if (inputValue && !isRangePicker) {
                const [day, _, year] = inputValue.split('/').map(Number)
                setInputValue(getDateforInput({ day, month: element + 1, year }))
            }
            closeMonthPicker()
        },
        []
    )

    const elements = MONTHS.map(element => element.split('').slice(0, 3).join(''))

    return <PickerItems elements={elements} onClick={itemClickHandler} />
})
