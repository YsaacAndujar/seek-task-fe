export interface ITask {
    _id: string
    title: string;
    description?: string | null;
    status: "todo" | "in_progress" | "done";
    created_at?: string;
}

export interface ITaskListResponse {
    data: ITask[]
    pagination: {
        total: number
    }
}