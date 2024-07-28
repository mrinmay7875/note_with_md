import { createSlice } from '@reduxjs/toolkit';
import { Note } from '../types/type';

const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    addNote: (state: Note[], action: { payload: Note }) => {
      state.push(action.payload);
    },
    updateNote: (state: Note[], action) => {
      const { id, title, body } = action.payload;
      const existingNote: Note | undefined = state.find(
        (note: Note) => note.id === id
      );
      if (existingNote) {
        existingNote.title = title;
        existingNote.body = body;
      }
    },
    deleteNote: (state, action) => {
      const { id } = action.payload;
      return state.filter((note: Note) => note.id !== id);
    },
  },
});

export const { addNote, updateNote, deleteNote } = notesSlice.actions;

export default notesSlice.reducer;
