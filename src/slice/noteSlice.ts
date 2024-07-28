import { createSlice } from '@reduxjs/toolkit';
import { Note } from '../types/type';

const notesSlice = createSlice({
  name: 'notes',
  initialState: Note[],
  reducers: {
    addNote: (state, action: { payload: Note }) => {
      state.push(action.payload);
    },
    updateNote: (state, action) => {
      const { id, title, body } = action.payload;
      const existingNote: Note = state.find((note) => note.id === id);
      if (existingNote) {
        existingNote.title = title;
        existingNote.body = body;
      }
    },
    deleteNote: (state, action) => {
      const { id } = action.payload;
      return state.filter((note) => note.id !== id);
    },
  },
});

export const { addNote, updateNote, deleteNote } = notesSlice.actions;

export default notesSlice.reducer;
