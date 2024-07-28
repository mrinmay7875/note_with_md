// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../slice/noteSlice';

const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});

export default store;
