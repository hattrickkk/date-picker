import React, { ChangeEvent, memo } from 'react'

import { Task } from '@customTypes/task'
import { Flex } from '@styles/flexStyles'

import { Item, RemoveIcon, TaskTitle } from './styled'

type Props = {
    elements: Task[]
    checkBoxHandler: (taskId: string) => (e: ChangeEvent<HTMLInputElement>) => void
    removeTask: (taskId: string) => (e: React.MouseEvent<HTMLDivElement>) => void
}

export const TaskList = memo(({ elements, checkBoxHandler, removeTask }: Props) => {
    return (
        <ul>
            {elements.map(({ id, completed, title }) => (
                <Item key={id}>
                    <Flex $justifycontent='flex-start'>
                        <input type='checkbox' defaultChecked={completed} onChange={checkBoxHandler(id)} />
                        <TaskTitle $completed={completed}>{title}</TaskTitle>
                        <RemoveIcon onClick={removeTask(id)} />
                    </Flex>
                </Item>
            ))}
        </ul>
    )
})
