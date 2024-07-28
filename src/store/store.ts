// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../slice/counterSlice';
import notesReducer from '../slice/noteSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    notes: notesReducer,
  },
});

export default store;
