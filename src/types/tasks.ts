interface Task {
    id: number;
    title: string;
    description: string;
    isEdit: boolean;
    isCompleted: boolean;
    isDeleted: boolean;
    isSaving: boolean;
    clickedOnAddTask: boolean;
}

export enum RequestType {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

export const DEFAULT_EMPTY_TASK: Task = {
    id: 0,
    title: "",
    description: "",
    isEdit: false,
    isCompleted: false,
    isDeleted: false,
    isSaving: false,
    clickedOnAddTask: false,
};

export const API_URL = "https://dummyjson.com/posts";

export default Task;