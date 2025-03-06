import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './tasksSlice';

const store: ReturnType<typeof configureStore> = configureStore({
    reducer: {
        tasksStore: tasksReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export const setupStore = (preloadedState?: Partial<RootState>): ReturnType<typeof configureStore> => {
    return configureStore({
        reducer: {
            tasksStore: tasksReducer,
        },
        preloadedState
    })
}

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch;

export default store;
