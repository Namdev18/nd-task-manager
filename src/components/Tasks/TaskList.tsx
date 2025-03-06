import React, { useCallback } from "react";
import TaskItem from "./TaskItem";
import Task, { DEFAULT_EMPTY_TASK, RequestType } from "../../types/tasks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
    createTask,
    deleteTask,
    editActiveTaskAction,
    editTaskAction,
    getCurrentTaskEdit,
    setTaskActiveEditAction,
    updateTask,
} from "../../redux/tasksSlice";
import TaskEditor from "./TaskEditor";

interface PostListProps {
    tasks: Task[];
}

const TaskList: React.FC<PostListProps> = ({ tasks }) => {
    const { activeEditTask, loading } = useSelector((state: RootState) =>
        getCurrentTaskEdit(state)
    );
    const dispatch = useDispatch();

    const onClickEditBtn = useCallback(
        (task: Task) => {
            dispatch(
                setTaskActiveEditAction({
                    ...task,
                })
            );
        },
        [dispatch]
    );

    const editCurTask = useCallback(
        (e: any) => {
            dispatch(
                editActiveTaskAction({
                    ...activeEditTask,
                    [e.target.name]: e.target.value,
                })
            );
        },
        [dispatch, activeEditTask]
    );

    const onClickOfAction = useCallback(
        (task: Task, key: string, value: any) => {
            dispatch(
                editTaskAction({
                    ...task,
                    [key]: value,
                })
            );
        },
        [dispatch]
    );

    const onSaveTask = useCallback(
        (task: Task) => {
            if (task.clickedOnAddTask) {
                dispatch(
                    createTask({
                        requestType: RequestType.POST,
                        payload: {
                            ...task,
                            userId: 1,
                            body: task.description
                        },
                    })
                );
            } else {
                dispatch(
                    updateTask({
                        requestType: RequestType.PUT,
                        payload: {
                            ...task,
                            body: task.description
                        },
                    })
                );
            }
        },
        [dispatch]
    );

    const onDeleteTask = useCallback(
        (id: number) => {
            dispatch(
                deleteTask({
                    requestType: RequestType.DELETE,
                    payload: id,
                })
            );
        },
        [dispatch]
    );

    if (!tasks.length) {
        return <section className="article-container">No tasks available</section>;
    }

    return (
        <section className="article-container">
            {activeEditTask.clickedOnAddTask && (
                <article className="article-box">
                    <div className="article-iner-box">
                        <details
                            className={`article-detail-box editing-post`}
                            open
                            onClick={(e) => e.preventDefault()}
                        >
                            <TaskEditor
                                loading={loading}
                                task={activeEditTask}
                                editCurTask={editCurTask}
                            />
                        </details>
                        <div className="task-actions">
                            <button
                                className="btn-edit-post"
                                onClick={() => onClickEditBtn(DEFAULT_EMPTY_TASK)}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn-save-post"
                                onClick={() => onSaveTask(activeEditTask)}
                                disabled={activeEditTask.clickedOnAddTask && (activeEditTask.title.trim() === "" || activeEditTask.description.trim() === "") || loading}
                            >
                                Create Task
                            </button>
                        </div>
                    </div>
                </article>
            )}

            {tasks.map((task) => (
                <TaskItem
                    key={`${task.id}_post`}
                    task={task}
                    activeEditTask={activeEditTask}
                    loading={loading}
                    onClickEditBtn={onClickEditBtn}
                    editCurTask={editCurTask}
                    onClickOfAction={onClickOfAction}
                    onSaveTask={onSaveTask}
                    onDeleteTask={onDeleteTask}
                />
            ))}
        </section>
    );
};

export default TaskList;