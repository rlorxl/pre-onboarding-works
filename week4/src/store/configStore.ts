import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { commentReducer } from './commentSlice';

const store = configureStore({
  reducer: {
    comment: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
