import { createSlice } from '@reduxjs/toolkit';
import { Tag } from '../types/type';

const tagsSlice = createSlice({
  name: 'tags',
  initialState: [
    { id: '1', name: 'react' },
    { id: '2', name: 'node' },
  ],
  reducers: {
    addTag: (state: Tag[], action: { payload: Tag }) => {
      state.push(action.payload);
    },

    deleteTag: (state, action) => {
      const { id } = action.payload;
      return state.filter((note: Tag) => note.id !== id);
    },
  },
});

export const { addTag, deleteTag } = tagsSlice.actions;

export default tagsSlice.reducer;
