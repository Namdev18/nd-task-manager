import {
    createSlice,
    PayloadAction,
    createAsyncThunk,
    Slice,
    SliceCaseReducers,
    createSelector,
} from "@reduxjs/toolkit";
import Task, { DEFAULT_EMPTY_TASK } from "../types/tasks";
import { taskAPIManager } from "../components/Helper";

interface TasksState {
    tasks: Task[];
    fetchAllTasksLoading: boolean;
    updateTaskLoading: boolean;
    deleteTaskLoading: boolean;
    createTaskLoading: boolean;
    error: string | null;
    activeEditTask: Task;
}

const initialState: TasksState = {
    tasks: [],
    fetchAllTasksLoading: false,
    updateTaskLoading: false,
    deleteTaskLoading: false,
    createTaskLoading: false,
    error: null,
    activeEditTask: DEFAULT_EMPTY_TASK,
};

const taskAPI = async ({
    requestType,
    payload,
}: {
    requestType: string;
    payload: any;
}) => {
    const { url, options } = taskAPIManager(requestType, payload);
    const response = await fetch(url, options);
    if (response.status === 200 || response.status === 201) {
        // console.log(response);
        // console.log(response?.json());
        return response.json();
    } else {
        console.log(response, response.body);
        throw response.body;
    }
};

export const fetchTasks: any = createAsyncThunk("tasks/fetchTasks", taskAPI);
export const createTask: any = createAsyncThunk("tasks/createTask", taskAPI);
export const updateTask: any = createAsyncThunk("tasks/updateTask", taskAPI);
export const deleteTask: any = createAsyncThunk("tasks/deleteTask", taskAPI);

const tasksSlice: Slice<
    TasksState,
    SliceCaseReducers<TasksState>
> = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        // addTask: (state, action: PayloadAction<Task>) => {
        //   state.tasks.push(action.payload);
        // },
        editTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(
                (post) => post.id === action.payload.id
            );
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        editActiveTask: (state, action: PayloadAction<Task>) => {
            if (state.activeEditTask.id === action.payload.id) {
                state.activeEditTask = action.payload;
            }
        },
        // deleteTask: (state, action: PayloadAction<number>) => {
        //   state.tasks = state.tasks.filter((post) => post.id !== action.payload);
        // },
        setTaskActiveEdit: (state, action: PayloadAction<Task>) => {
            if (!action.payload.isEdit) {
                state.activeEditTask = {
                    ...action.payload,
                    isEdit: true,
                };
            } else {
                state.activeEditTask = DEFAULT_EMPTY_TASK;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.fetchAllTasksLoading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload?.posts.map((p: any) => ({
                    ...DEFAULT_EMPTY_TASK,
                    id: p.id,
                    title: p.title,
                    description: p.body,
                }));
                state.fetchAllTasksLoading = false;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.fetchAllTasksLoading = false;
                state.error = action.error.message || "Failed to fetch tasks";
            })
            .addCase(createTask.pending, (state) => {
                state.createTaskLoading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.activeEditTask = DEFAULT_EMPTY_TASK;
                state.tasks.push({
                    ...DEFAULT_EMPTY_TASK,
                    id: action.payload.id,
                    description: action.payload.body,
                    title: action.payload.title
                });
                state.createTaskLoading = false;
            })
            .addCase(createTask.rejected, (state, action) => {
                state.createTaskLoading = false;
                state.error = action.error.message || "Failed to create tasks";
            })
            .addCase(updateTask.pending, (state) => {
                state.updateTaskLoading = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                console.log("PUT", action.payload);
                const index = state.tasks.findIndex(
                    (post) => post.id === action.payload.id
                );
                if (index !== -1) {
                    state.tasks[index] = {
                        ...state.tasks[index],
                        title: action.payload.title,
                        description: action.payload.body,
                    };
                    state.activeEditTask = DEFAULT_EMPTY_TASK;
                }
                state.updateTaskLoading = false;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.updateTaskLoading = false;
                state.error = action.error.message || "Failed to update tasks";
            })
            .addCase(deleteTask.pending, (state, action) => {
                console.log("deleteTask 1", state.error, action.error);
                state.deleteTaskLoading = true;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                console.log("deleteTask 2", state.error, action.error);
                if (!action.error) {
                    state.tasks = state.tasks.filter(
                        (post) => post.id !== action.payload.id
                    );
                } else {
                    state.error = action.error.message || "Failed to delete tasks";
                }
                state.deleteTaskLoading = false;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                console.log("deleteTask 3", state.error, action.error);
                state.deleteTaskLoading = false;
                state.error = action.error.message || "Failed to delete tasks";
            });
    },
});

// export const addTaskAction: typeof tasksSlice.actions.addTask =
//   tasksSlice.actions.addTask;
export const editActiveTaskAction: typeof tasksSlice.actions.editActiveTask =
    tasksSlice.actions.editActiveTask;
// export const deleteTaskAction: typeof tasksSlice.actions.deleteTask =
//   tasksSlice.actions.deleteTask;
export const setTaskActiveEditAction: typeof tasksSlice.actions.setTaskActiveEdit =
    tasksSlice.actions.setTaskActiveEdit;
export const editTaskAction: typeof tasksSlice.actions.editTask =
    tasksSlice.actions.editTask;

export const getTaskState: ReturnType<typeof createSelector> = createSelector(
    (state: { tasksStore: TasksState }) => state.tasksStore,
    (tasksStore) => ({
        tasks: tasksStore.tasks,
        loading: tasksStore.fetchAllTasksLoading,
        error: tasksStore.error,
        allLoadingState: tasksStore.fetchAllTasksLoading || tasksStore.updateTaskLoading || tasksStore.deleteTaskLoading || tasksStore.createTaskLoading,
        clickedOnAddTask: tasksStore.activeEditTask.clickedOnAddTask
    })
);

export const getCurrentTaskEdit: ReturnType<typeof createSelector> =
    createSelector(
        (state: { tasksStore: TasksState }) => state.tasksStore,
        (tasksStore) => ({
            activeEditTask: tasksStore.activeEditTask,
            loading:
                tasksStore.fetchAllTasksLoading ||
                tasksStore.updateTaskLoading ||
                tasksStore.deleteTaskLoading ||
                tasksStore.createTaskLoading,
        })
    );

export const getAPIError: ReturnType<typeof createSelector> =
    createSelector(
        (state: { tasksStore: TasksState }) => state.tasksStore,
        (tasksStore) => ({
            error: tasksStore.error
        })
    );

export const tasksReducer: typeof tasksSlice.reducer = tasksSlice.reducer;
