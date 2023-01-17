import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { commentReducer } from './commentSlice';
import logger from 'redux-logger';
import { useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    comment: commentReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
