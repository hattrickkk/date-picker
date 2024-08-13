import React, { memo, useCallback, useContext } from 'react'

import { MONTHS } from '@constants/month'
import { PickerItems } from '@ui/pickerItems'
import { getDateforInput } from '@utils/getDateForInput'
import { WithUserDateRedirectContext } from '@utils/hocs/withUserDateRedirect'

type Props = {
    setMonth: React.Dispatch<React.SetStateAction<number>>
    closeMonthPicker: VoidFunction
    rangePicker: boolean
}

export const MonthPicker = memo(({ setMonth, closeMonthPicker, rangePicker }: Props) => {
    const { inputValue, setInputValue } = useContext(WithUserDateRedirectContext)
    const itemClickHandler = useCallback(
        (element: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            setMonth(element)
            if (inputValue && !rangePicker) {
                const [day, _, year] = inputValue.split('/').map(value => +value)
                setInputValue(getDateforInput(day, element + 1, year))
            }
            closeMonthPicker()
        },
        []
    )

    const elements = MONTHS.map(element => element.split('').slice(0, 3).join(''))

    return <PickerItems elements={elements} onClick={itemClickHandler} />
})
