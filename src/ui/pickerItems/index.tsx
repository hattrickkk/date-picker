import React, { memo, useContext } from 'react'

import { OnPickerItemClick } from '@customTypes/pickerItemClickType'
import { Flex } from '@styles/flexStyles'
import { WithRestrictionsContext } from '@utils/hocs/withRestrictions'

import { Item, Wrapper } from './styled'

type Props = {
    elements: (number | string)[]
    onClick: OnPickerItemClick
}

export const PickerItems = memo(({ elements, onClick }: Props) => {
    const { minYear, maxYear } = useContext(WithRestrictionsContext)
    return (
        <Wrapper>
            <Flex $flexwrap='wrap' $justifycontent='flex-start'>
                {elements.map((element, index) => (
                    <Item
                        key={element}
                        $disable={+element < minYear || +element > maxYear}
                        onClick={onClick(typeof element === 'string' ? index : +element)}
                    >
                        {element}
                    </Item>
                ))}
            </Flex>
        </Wrapper>
    )
})
