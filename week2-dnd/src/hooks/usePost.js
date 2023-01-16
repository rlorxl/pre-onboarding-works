import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { API } from '../api/api';
import { issueActions } from '../store/modules/issue-slice';

const usePost = () => {
  const dispatch = useDispatch();

  const getAllIssues = useCallback(async () => {
    try {
      const response = await API.getAll();

      if (response.status !== 200) {
        throw new Error('something went wrong.');
      }

      dispatch(issueActions.setData(response.data));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  const createIssue = useCallback(
    async (newIssueData) => {
      try {
        dispatch(issueActions.createData(newIssueData));

        const response = await API.createIssue(newIssueData);

        if (response.status !== 201) {
          throw new Error('something went wrong.');
        }

        getAllIssues();
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch, getAllIssues]
  );

  const updateIssue = useCallback(
    async (newIssueData) => {
      try {
        dispatch(issueActions.updateData(newIssueData));

        const response = await API.updateIssue(newIssueData.id, newIssueData);

        if (response.status !== 200) {
          throw new Error('something went wrong.');
        }
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );

  const deleteIssue = useCallback(
    async (id) => {
      try {
        dispatch(issueActions.deleteData({ id }));

        const response = await API.deleteIssue(id);

        if (response.status !== 200) {
          throw new Error('something went wrong.');
        }
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );

  // const resetIssues = useCallback((ids, issues) => {
  //   const { id, targetId } = ids;

  //   const deleteArr = Object.values(ids);
  //   deleteArr.forEach((id) => deleteIssue(+id));

  //   issues.forEach((issue) => {
  //     if (issue.id === +id || issue.id === +targetId) {
  //       createIssue(issue);
  //     }
  //   });
  // }, []);

  return {
    getAllIssues,
    createIssue,
    updateIssue,
    deleteIssue,
    // resetIssues,
  };
};

export default usePost;
