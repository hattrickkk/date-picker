import { useEffect, useState } from 'react'

import { HOLIDAYS_KEY } from '@constants/magicValues'
import { Holiday } from '@customTypes/holidays'

export const useHolidays = (arr: Holiday[]) => {
    const [holidays, setHolidays] = useState<Holiday[]>([])
    useEffect(() => {
        const cachedHolidays = localStorage.getItem(HOLIDAYS_KEY)
        if (cachedHolidays) {
            setHolidays(JSON.parse(cachedHolidays))
        } else {
            localStorage.setItem(HOLIDAYS_KEY, JSON.stringify(arr))
        }
    }, [])
    return holidays
}
