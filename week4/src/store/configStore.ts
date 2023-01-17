import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { commentReducer } from './commentSlice';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    comment: commentReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
