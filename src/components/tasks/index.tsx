import React, { ChangeEvent, memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { Task } from '@customTypes/task'
import { Flex } from '@styles/flexStyles'
import { TaskList } from '@ui/taskItem'
import { getTasksFromLocalStorage } from '@utils/getTasksFromLocalStorage'
import { WithTasksContext } from '@utils/hocs/withTasks'
import { useSetTasksToLocalstorage } from '@utils/hooks/useSetTasksToLocalStorage'

import { AddButton, StyledInput, TaskBlock, Title, Wrapper } from './styled'

type Props = {
    date: string
}

export const Tasks = memo(({ date }: Props) => {
    const { tasksPickerService } = useContext(WithTasksContext)
    const [tasks, setTasks] = useState(() => tasksPickerService.getTasksByDate(date))
    const [inputValue, setInputValue] = useState('')

    const uncompletedTasks = useMemo(() => tasks.filter(({ completed }) => !completed), [tasks])
    const completedTasks = useMemo(() => tasks.filter(({ completed }) => completed), [tasks])

    const onChangeHandler = useCallback(({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
        setInputValue(value)
    }, [])

    const addTaskClickHandler = useCallback(() => {
        setTasks(prevTasks => [
            ...prevTasks,
            {
                title: inputValue,
                id: new Date().toISOString(),
                completed: false,
            },
        ])
        setInputValue('')
    }, [inputValue, tasks])

    const checkBoxHandler = useCallback(
        (taskId: string) => (e: ChangeEvent<HTMLInputElement>) => {
            e.stopPropagation()
            setTasks(prevTasks => [
                ...prevTasks.filter(prevTask => prevTask.id !== taskId),
                {
                    ...(tasks.find(({ id }) => id === taskId) as Task),
                    completed: e.target.checked,
                },
            ])
        },
        [tasks]
    )

    const removeTask = useCallback(
        (taskId: string) => (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation()
            setTasks(prevTasks => [...prevTasks.filter(({ id }) => id !== taskId)])
        },
        [tasks]
    )

    useSetTasksToLocalstorage(tasks, date, tasksPickerService)
    useEffect(() => {
        setTasks(getTasksFromLocalStorage()[date] ? getTasksFromLocalStorage()[date].tasks : [])
    }, [date])

    return (
        <>
            <Flex>
                <StyledInput onChange={onChangeHandler} value={inputValue} />
                <AddButton $disabled={!inputValue.length} onClick={addTaskClickHandler}>
                    Add
                </AddButton>
            </Flex>
            <Wrapper>
                {!!uncompletedTasks.length && (
                    <TaskBlock>
                        <Title>Uncompleted</Title>
                        <TaskList
                            elements={uncompletedTasks}
                            checkBoxHandler={checkBoxHandler}
                            removeTask={removeTask}
                        />
                    </TaskBlock>
                )}
                {!!completedTasks.length && (
                    <TaskBlock>
                        <Title>Completed</Title>
                        <TaskList elements={completedTasks} checkBoxHandler={checkBoxHandler} removeTask={removeTask} />
                    </TaskBlock>
                )}
            </Wrapper>
        </>
    )
})
