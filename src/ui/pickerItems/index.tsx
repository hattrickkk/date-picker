import React, { memo, useContext } from 'react'

import { pickerItemClick } from '@customTypes/pickerItemClickType'
import { Flex } from '@styles/flexStyles'
import { WithRestrictionsContext } from '@utils/hocs/withRestrictions'

import { Item, Wrapper } from './styled'

type Props = {
    elements: (number | string)[]
    onClick: pickerItemClick
}

export const PickerItems = memo(({ elements, onClick }: Props) => {
    const { minYear, maxYear } = useContext(WithRestrictionsContext)
    return (
        <Wrapper>
            <Flex $flexwrap='wrap' $justifycontent='flex-start'>
                {elements.map((el, i) => (
                    <Item
                        key={el}
                        $disable={(el as number) < minYear || (el as number) > maxYear}
                        onClick={onClick(typeof elements[0] === 'string' ? i : (el as number))}
                    >
                        {el}
                    </Item>
                ))}
            </Flex>
        </Wrapper>
    )
})
