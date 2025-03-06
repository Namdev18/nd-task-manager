// import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskList from '../components/Tasks/TaskList';
import { DEFAULT_EMPTY_TASK } from '../types/tasks';
import { Provider } from 'react-redux';
import store from '../redux/store';

describe('TaskList Component', () => {

    test("App Component Loaded successfully", async () => {
        let container;
        await act(async () => {
            const result = render(
                <Provider store={store}>
                    <TaskList tasks={[]} />
                </Provider>
            );
            container = result.container;
        });
        expect(container).toMatchSnapshot();
    });

    test('renders TaskList component', () => {
        render(
            <Provider store={store}>
                <TaskList tasks={[]} />
            </Provider>
        );
        expect(screen.getByText('No tasks available')).toBeInTheDocument();
    });

    test('displays tasks', () => {
        const tasks = [
            { ...DEFAULT_EMPTY_TASK, id: 1, title: 'Task 1', description: 'Some Description 1' },
            { ...DEFAULT_EMPTY_TASK, id: 2, title: 'Task 2', description: 'Some Description 2' },
        ];
        render(
            <Provider store={store}>
                <TaskList tasks={tasks} />
            </Provider>
        );
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
    });
});