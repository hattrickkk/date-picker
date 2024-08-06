import React, { useCallback } from 'react'
import MONTHS from '@constants/month'
import PickerItems from '@ui/pickerItems'

type Props = {
    setMonth: React.Dispatch<React.SetStateAction<number>>
    closeMonthPicker: VoidFunction
}

function MonthPicker({ setMonth, closeMonthPicker }: Props) {
    const itemClickHandler = useCallback(
        (el: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            setMonth(el)
            closeMonthPicker()
        },
        []
    )

    const elements = MONTHS.map(el => el.split('').slice(0, 3).join(''))

    return <PickerItems elements={elements} onClick={itemClickHandler} />
}

export default React.memo(MonthPicker)
