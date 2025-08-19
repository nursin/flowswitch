import { createSlice, createSelector } from '@reduxjs/toolkit';
import { analyzeTask } from '@/lib/nlp';

const calculateActivationScore = (task) => {
  let score = 0;
  if (task.urgency === 'high') score += 40;
  else if (task.urgency === 'medium') score += 20;
  else score += 5;

  if (task.interest === 'high') score += 30;
  else if (task.interest === 'medium') score += 15;
  else score += 5;

  if (task.novelty === 'high') score += 20;
  else if (task.novelty === 'medium') score += 10;
  else score += 2;

  if (task.hasCompetition) score += 10;
  return score;
};

const initialState = {
  tasks: [],
  completedTasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        ...action.payload,
        createdAt: new Date().toISOString(),
        activationScore: calculateActivationScore(action.payload),
        title: action.payload.title || 'Untitled Task',
      };
      state.tasks.push(newTask);
    },
    addBrainDumpTasks: (state, action) => {
      const newTasks = action.payload.map((title) => {
        const analyzedParams = analyzeTask(title);
        const taskData = {
          id: Date.now() + Math.random(),
          title,
          ...analyzedParams,
          createdAt: new Date().toISOString(),
        };
        taskData.activationScore = calculateActivationScore(taskData);
        return taskData;
      });
      state.tasks.push(...newTasks);
    },
    completeTask: (state, action) => {
      const taskId = action.payload;
      const taskIndex = state.tasks.findIndex((t) => t.id === taskId);
      if (taskIndex !== -1) {
        const task = state.tasks[taskIndex];
        state.completedTasks.push({
          ...task,
          completedAt: new Date().toISOString(),
        });
        state.tasks.splice(taskIndex, 1);
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter((t) => t.id !== taskId);
    },
    addSubtasks: (state, action) => {
      const newTasks = action.payload.map(subtask => ({
        id: Date.now() + Math.random(),
        title: subtask.title || 'Untitled Subtask',
        ...subtask,
        createdAt: new Date().toISOString(),
        activationScore: calculateActivationScore(subtask)
      }));
      state.tasks.push(...newTasks);
    }
  },
});

export const { addTask, addBrainDumpTasks, completeTask, deleteTask, addSubtasks } = tasksSlice.actions;

const selectTasks = (state) => state.tasks.tasks;
const selectCompletedTasks = (state) => state.tasks.completedTasks;

export const selectSortedTasks = createSelector([selectTasks], (tasks) => {
  return [...tasks].sort((a, b) => b.activationScore - a.activationScore);
});

export const selectZoneTasks = createSelector([selectSortedTasks], (sortedTasks) => {
  return sortedTasks.slice(0, 3);
});

export const selectCompletedToday = createSelector([selectCompletedTasks], (completedTasks) => {
  return completedTasks.filter(t => new Date(t.completedAt).toDateString() === new Date().toDateString()).length;
});

export default tasksSlice.reducer;
