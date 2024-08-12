import React, { ChangeEvent, forwardRef, useCallback, useContext, useState } from 'react'

import { DATE_REGEX, NUMS_REGEX } from '@constants/magicValues'
import { CalendarIcon } from '@ui/calendarIcon'
import { CloseIcon } from '@ui/closeIcon'
import { getDateforInput } from '@utils/getDateForInput'
import { WithRangeContext } from '@utils/hocs/withRange'
import { WithRestrictionsContext } from '@utils/hocs/withRestrictions'
import { WithUserDateRedirectContext } from '@utils/hocs/withUserDateRedirect'

import { StyledCalendarIcon, StyledCloseIcon, StyledError, StyledInput, StyledWrapper } from './styled'

type Props = {
    onClick: VoidFunction
    setSelectedDate: React.Dispatch<React.SetStateAction<number | null>>
    isFromInput: boolean
    rangePicker: boolean
}

export const Input = forwardRef<HTMLInputElement, Props>(
    ({ onClick, setSelectedDate, isFromInput, rangePicker }: Props, ref) => {
        const [error, setError] = useState('')

        const { setDate, inputValue, setInputValue } = useContext(WithUserDateRedirectContext)
        const { minYear, maxYear } = useContext(WithRestrictionsContext)
        const { setRangeEnd, setRangeStart } = useContext(WithRangeContext)

        const onInputChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            setError('')
            const condition = value.length <= 1 ? '' : inputValue
            const re = new RegExp(NUMS_REGEX)
            setInputValue(re.test(value) ? value : condition)
        }

        const handleKeyDown = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
            if (key === 'Enter') {
                const regex = new RegExp(DATE_REGEX)
                if (regex.test(inputValue)) {
                    const [day, month, year] = inputValue.split('/').map(element => +element)
                    const date = new Date(year, month - 1, day)
                    const isValid = date.getMonth() === month - 1 && date.getDate() === day
                    const settedYear = year > maxYear ? maxYear : year <= minYear ? minYear : year
                    setInputValue(getDateforInput(day, month, settedYear))
                    isValid ? setDate({ day, month, year: settedYear }) : setError('No such date exists')
                } else {
                    setError('Invalid format')
                }
            }
        }

        const closeIconClickHandler = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation()
            setInputValue('')
            setError('')
            setSelectedDate(null)
            if (rangePicker) {
                isFromInput ? setRangeStart(null) : setRangeEnd(null)
            }
        }, [])

        return (
            <>
                <StyledWrapper>
                    <StyledCalendarIcon>
                        <CalendarIcon />
                    </StyledCalendarIcon>
                    <StyledInput
                        type='text'
                        placeholder='DD/MM/YYYY'
                        value={inputValue}
                        onClick={onClick}
                        ref={ref}
                        onChange={onInputChange}
                        onKeyDown={handleKeyDown}
                        maxLength={10}
                        $isError={!!error}
                    />
                    {!!inputValue && (
                        <StyledCloseIcon onClick={closeIconClickHandler}>
                            <CloseIcon />
                        </StyledCloseIcon>
                    )}
                </StyledWrapper>
                <StyledError>{error}</StyledError>
            </>
        )
    }
)
