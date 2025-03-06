import React, { useMemo } from "react";
import Task from "../../types/tasks";
import TaskEditor from "./TaskEditor";

interface TaskItemProps {
    task: Task;
    activeEditTask: Task;
    loading: boolean;
    onClickEditBtn: (task: Task) => void;
    editCurTask: (e: any) => void;
    onClickOfAction: (task: Task, key: string, value: any) => void;
    onSaveTask: (task: Task) => void;
    onDeleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, activeEditTask, loading, onClickEditBtn, editCurTask, onClickOfAction, onSaveTask, onDeleteTask }) => {

    const isCurrentTaskinEditMode = useMemo(
        () => activeEditTask.isEdit && activeEditTask.id === task.id,
        [activeEditTask.isEdit, activeEditTask.id, task.id]
    );

    const disableConditionCheckAndDelBtn = useMemo(
        () => isCurrentTaskinEditMode || loading,
        [isCurrentTaskinEditMode, loading]
    );

    const disableConditionForSaveBtn = useMemo(
        () =>
            loading ||
            activeEditTask.title === "" ||
            activeEditTask.description === "" ||
            (activeEditTask.title.trim() === task.title.trim() &&
                activeEditTask.description.trim() === task.description.trim()),
        [loading, activeEditTask]
    );

    const disableConditionForEditBtn = useMemo(
        () =>
            (!!activeEditTask.id && task.id !== activeEditTask.id) ||
            loading ||
            task.isCompleted,
        [activeEditTask, loading, task]
    );

    return (
        <article className="article-box">
            <div className="article-iner-box">
                <input
                    id={`${task.id + 1}_post_checkbox`}
                    checked={task.isCompleted}
                    className="task-done-checkbox"
                    type="checkbox"
                    title="Mark as Task Complete"
                    disabled={disableConditionCheckAndDelBtn}
                    onChange={() => onClickOfAction(task, "isCompleted", !task.isCompleted)}
                />
                <details
                    className={`article-detail-box ${task.isEdit ? "editing-post" : ""}`}
                    open
                    onClick={(e) => e.preventDefault()}
                >
                    {isCurrentTaskinEditMode ? (
                        <TaskEditor
                            loading={loading}
                            task={activeEditTask}
                            editCurTask={editCurTask}
                        />
                    ) : (
                        <>
                            <summary>{task.title || ""}</summary>
                            <p>{task.description || ""}</p>
                        </>
                    )}
                </details>
                <div className="task-actions">
                    <button
                        className="btn-edit-post"
                        onClick={() =>
                            onClickEditBtn(activeEditTask.isEdit ? activeEditTask : task)
                        }
                        disabled={disableConditionForEditBtn}
                    >
                        {isCurrentTaskinEditMode ? "Cancel Edit" : "Edit"}
                    </button>
                    {isCurrentTaskinEditMode && (
                        <button
                            className="btn-save-post"
                            onClick={() => onSaveTask(activeEditTask)}
                            disabled={disableConditionForSaveBtn}
                        >
                            Save Task
                        </button>
                    )}
                    <button
                        className="btn-delete-post"
                        onClick={() => onDeleteTask(task.id)}
                        disabled={disableConditionCheckAndDelBtn}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </article>
    );
};

export default TaskItem;