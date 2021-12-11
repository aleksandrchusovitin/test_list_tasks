import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, { payload: { task } }) => {
      state.tasks = [...state.tasks, task];
    },
    removeTask: (state, { payload: { id } }) => {
      state.tasks = state.tasks.filter((t) => t.id !== id);
    },
    updateTask: (state, { payload: { task } }) => {
      const taskIndex = state.tasks.findIndex((t) => t.id === task.id);
      state.tasks[taskIndex] = task;
    },
  },
});

const { actions, reducer } = tasksSlice;

export default reducer;
export const {
  addTask,
  removeTask,
  updateTask,
} = actions;
