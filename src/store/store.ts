// app/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import notesReducer from '../slice/noteSlice';
import tagsReducer from '../slice/tagsSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const reducer = combineReducers({
  notes: notesReducer,
  tags: tagsReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
