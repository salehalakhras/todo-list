
export type Task = {
    id: string
    title: string
    description: string
    dueDate: string
    priority: string
    state: string
    project: number
}

export type Project = {
    id: string
    name: string
    tasks: Task[]
}