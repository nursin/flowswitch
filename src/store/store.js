import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '@/store/tasksSlice';
import statsReducer from '@/store/statsSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('flow-switch-state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('flow-switch-state', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    stats: statsReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
