import React, { ChangeEvent, forwardRef, useCallback, useContext, useMemo, useState } from 'react'

import { DATE_REGEX, NUMS_REGEX } from '@constants/magicValues'
import { CalendarIcon } from '@ui/calendarIcon'
import { CloseIcon } from '@ui/closeIcon'
import { getDateforInput } from '@utils/getDateForInput'
import { WithRangeContext } from '@utils/hocs/withRange'
import { WithRestrictionsContext } from '@utils/hocs/withRestrictions'
import { WithUserDateRedirectContext } from '@utils/hocs/withUserDateRedirect'
import { validateInput } from '@utils/validateInput'

import { StyledCalendarIcon, StyledCloseIcon, StyledError, StyledInput, StyledWrapper } from './styled'

type Props = {
    onClick: VoidFunction
    setSelectedDate: React.Dispatch<React.SetStateAction<number | null>>
    isFromInput: boolean
    isRangePicker: boolean
}

export const Input = forwardRef<HTMLInputElement, Props>(
    ({ onClick, setSelectedDate, isFromInput, isRangePicker }: Props, ref) => {
        const [error, setError] = useState('')

        const { setDate, inputValue, setInputValue } = useContext(WithUserDateRedirectContext)
        const { minYear, maxYear } = useContext(WithRestrictionsContext)
        const { setRangeEnd, setRangeStart } = useContext(WithRangeContext)

        const isInputValueValid = useMemo(() => new RegExp(DATE_REGEX).test(inputValue), [inputValue])
        const isError = !isInputValueValid && !!error

        const onInputChange = useCallback(
            ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
                setError('')
                const condition = value.length <= 1 ? '' : inputValue
                const regex = new RegExp(NUMS_REGEX)
                setInputValue(regex.test(value) ? value : condition)
            },
            [inputValue]
        )

        const handleKeyDown = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
            if (key === 'Enter') {
                if (isInputValueValid) {
                    const {
                        date: [day, month, year],
                        isValid,
                    } = validateInput(inputValue, maxYear, minYear)
                    setInputValue(getDateforInput(day, month, year))
                    isValid ? setDate({ day, month, year }) : setError('No such date exists')
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
            if (isRangePicker) {
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
                        $isError={isError}
                    />
                    {!!inputValue && (
                        <StyledCloseIcon onClick={closeIconClickHandler}>
                            <CloseIcon />
                        </StyledCloseIcon>
                    )}
                </StyledWrapper>
                {isError && <StyledError>{error}</StyledError>}
            </>
        )
    }
)
