import { ResponseHoliday } from '@customTypes/holidays'

export const getHolidays = async (): Promise<ResponseHoliday[]> => {
    const response = await fetch(
        'https://openholidaysapi.org/PublicHolidays?countryIsoCode=BY&validFrom=2023-01-01&validTo=2024-01-01'
    )

    return response.json()
}
