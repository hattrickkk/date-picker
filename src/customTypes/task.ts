export type Task = {
    id: string
    title: string
    completed: boolean
}

export type Tasks = {
    [key: string]: {
        tasks: Task[]
    }
}
