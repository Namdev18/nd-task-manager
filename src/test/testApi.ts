export const fetchTasks = async (): Promise<any> => {
    // Simulate an API call to fetch tasks
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Task 1", completed: false },
                { id: 2, title: "Task 2", completed: true },
            ]);
        }, 1000);
    });
};