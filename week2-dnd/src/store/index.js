import { configureStore } from '@reduxjs/toolkit';
import issueSlice from './modules/issue-slice';

const store = configureStore({
  reducer: {
    issue: issueSlice.reducer,
  },
});

export default store;
