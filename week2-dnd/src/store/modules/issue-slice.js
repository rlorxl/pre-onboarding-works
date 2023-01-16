import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialStateValue = {
  issues: [],
};

const issueSlice = createSlice({
  name: 'issue',
  initialState: initialStateValue,
  reducers: {
    setData: (state, action) => {
      state.issues = action.payload;
    },
    createData: (state, action) => {
      state.issues.push(action.payload);
    },
    updateData: (state, action) => {
      state.issues = state.issues.map((issue) =>
        issue.id === action.payload.id ? action.payload : issue
      );
    },
    deleteData: (state, action) => {
      state.issues = state.issues.filter(
        (issue) => issue.id !== action.payload.id
      );
    },
    changePosition: (state, action) => {
      console.log(action.payload);
      const { id, targetData } = action.payload;
    },
  },
});

const issueSelector = (state) => state.issue.issues || initialStateValue.issues;

export const issueDataSelector = createSelector(issueSelector, (issues) => {
  let newIssues = {};

  issues.forEach((issue) => {
    let values = [];
    values.push(issue);

    if (issue.status === 'todo') {
      if (newIssues['todo']) newIssues['todo'].push(issue);
      else newIssues['todo'] = values;
    }
    if (issue.status === 'proceeding') {
      if (newIssues['proceeding']) newIssues['proceeding'].push(issue);
      else newIssues['proceeding'] = values;
    }
    if (issue.status === 'done') {
      if (newIssues['done']) newIssues['done'].push(issue);
      else newIssues['done'] = values;
    }
  });

  return newIssues;
});

/*
  {
    "todo": [{...},{...}],
    "proceeding": [{...}],
    "done": [{...}],
  } */

export const issueActions = issueSlice.actions;
export default issueSlice;
