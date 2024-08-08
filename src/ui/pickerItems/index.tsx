import React, { memo } from 'react'

import { pickerItemClick } from '@customTypes/pickerItemClickType'
import { Flex } from '@styles/flexStyles'

import { Item, Wrapper } from './styled'

type Props = {
    elements: (number | string)[]
    onClick: pickerItemClick
}

export const PickerItems = memo(({ elements, onClick }: Props) => {
    return (
        <Wrapper>
            <Flex $flexwrap='wrap'>
                {elements.map((el, i) => (
                    <Item key={el} onClick={onClick(typeof elements[0] === 'string' ? i : (el as number))}>
                        {el}
                    </Item>
                ))}
            </Flex>
        </Wrapper>
    )
})
