import axios from "axios"
import { ITask, ITaskListResponse } from "interfaces/tasks"

export const getTasks = (params?: { page: number, limit: number, param?: string }) => {
    return axios.get<never, ITaskListResponse>('/tasks', { params })
}

export const getTask = (id: string) => {
    return axios.get<never, ITask>(`/tasks/${id}`,)
}

export const deleteTask = (id: string) => {
    return axios.delete(`/tasks/${id}`,)
}

export const updateTask = (id: string, task: ITask) => {
    return axios.put(`/tasks/${id}`, task)
}

export const postTask = (task: ITask) => {
    return axios.post(`/tasks`, task)
}

export const getTaskStats = () => {
    return axios.get(`/tasks/stats`)
}