import { configureStore } from '@reduxjs/toolkit';
import tasks from './slices/tasks.js';
import modal from './slices/modal.js';

const store = configureStore({
  reducer: { tasks, modal },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
