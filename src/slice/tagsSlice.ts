import { createSlice } from '@reduxjs/toolkit';
import { Tag } from '../types/type';

const tagsSlice = createSlice({
  name: 'tags',
  initialState: [],
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
