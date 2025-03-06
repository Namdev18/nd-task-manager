import React from "react";
// { ReactEventHandler }
import Task from "../../types/tasks";
// import { useSelector } from "react-redux";
// import { getCurrentTaskEdit } from "../redux/tasksSlice";

interface PostEditorProps {
    task: Task;
    loading: boolean;
    editCurTask: (e: any) => void;
}

const TaskEditor: React.FC<PostEditorProps> = ({ task, loading, editCurTask }) => {
    return (
        <>
            <summary>
                <input
                    className="form-input"
                    type="text"
                    name="title"
                    id={`${task.id}_post_title_input`}
                    value={task.title}
                    disabled={loading}
                    aria-invalid={task.title === ""}
                    onChange={editCurTask}
                    placeholder="Please enter task title"
                />
            </summary>
            <p>
                <textarea
                    className="form-input form-textarea"
                    name="description"
                    rows={3}
                    id={`${task.id}_post_description_input`}
                    value={task.description}
                    disabled={loading}
                    aria-invalid={task.description === ""}
                    onChange={editCurTask}
                    placeholder="Please enter task description"
                />
            </p>
        </>
    );
};

export default TaskEditor;