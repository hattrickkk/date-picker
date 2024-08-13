type HolidayName = {
    language: string
    text: string
}

export type ResponseHoliday = {
    id: string
    startDate: string
    endDate: string
    type: string
    name: HolidayName[]
    nationwide: boolean
}

export type Holiday = {
    id: string
    month: number
    day: number
    name: string
}
