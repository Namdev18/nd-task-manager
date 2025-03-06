import React, { JSX, Suspense, useCallback, useEffect } from "react";
import { DEFAULT_EMPTY_TASK, RequestType } from "./types/tasks";
import { AppDispatch } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  editActiveTaskAction,
  fetchTasks,
  getTaskState,
} from "./redux/tasksSlice";

const TaskList = React.lazy(() => import("./components/Tasks/TaskList"));

const LoaderComp = () => (
  <div style={{ textAlign: "center" }}>Loading Tasks</div>
);

function App(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const { tasks, loading, allLoadingState, clickedOnAddTask } = useSelector(
    (state) => getTaskState(state)
  );

  useEffect(() => {
    dispatch(
      fetchTasks({
        requestType: RequestType.GET,
        payload: {},
      })
    );
  }, []);

  const onAddNewTask = useCallback(() => {
    dispatch(
      editActiveTaskAction({
        ...DEFAULT_EMPTY_TASK,
        clickedOnAddTask: true,
      })
    );
  }, []);



  return (
    <section className="main-wrapper">
      <header>
        <h1 className="main-title">NS - Task Manager</h1>
      </header>
      <section className="task-wrapper">
        <header className="task-main-header">
          <h2 className="task-list-heading">Task List</h2>
          <div>
            <button
              className="btn"
              onClick={onAddNewTask}
              disabled={allLoadingState || clickedOnAddTask}
            >
              Add Task
            </button>
          </div>
        </header>
        {loading ? (
          <LoaderComp />
        ) : (
          <Suspense fallback={<LoaderComp />}>
            <TaskList tasks={tasks} />
          </Suspense>
        )}
      </section>
      <footer>Thank you for visit.</footer>
    </section>
  )
}

export default App;
