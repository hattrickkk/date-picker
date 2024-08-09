import { useEffect, useState } from 'react'

import { HOLIDAYS_KEY } from '@constants/magicValues'
import { Holiday } from '@customTypes/holidays'
import { getHolidays } from '@utils/getHolidays'
import { mapHolidays } from '@utils/mapHolidays'

export const useHolidays = () => {
    const [holidays, setHolidays] = useState<Holiday[]>([])
    useEffect(() => {
        const cachedHolidays = localStorage.getItem(HOLIDAYS_KEY)
        if (cachedHolidays) {
            setHolidays(JSON.parse(cachedHolidays))
        } else {
            getHolidays().then(res => {
                const mappedHolidays = mapHolidays(res)
                setHolidays(mappedHolidays)
                localStorage.setItem(HOLIDAYS_KEY, JSON.stringify(mappedHolidays))
            })
        }
    }, [])
    return holidays
}
