import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import usePost from './hooks/usePost';
import { issueDataSelector } from './store/modules/issue-slice';

import List from './components/List';
import BoardContainer from './components/UI/BoardContainer';
import GlobalStyle from './style/global';

const title = {
  TODO: '할 일',
  PROCEEDING: '진행 중',
  DONE: '완료',
};

function App() {
  const { getAllIssues } = usePost();

  const issues = useSelector(issueDataSelector);

  const { todo, proceeding, done } = issues;

  useEffect(() => {
    getAllIssues();
  }, [getAllIssues]);

  return (
    <>
      <GlobalStyle />
      <BoardContainer>
        <List issue={todo} status={title['TODO']} />
        <List issue={proceeding} status={title['PROCEEDING']} />
        <List issue={done} status={title['DONE']} />
      </BoardContainer>
    </>
  );
}

export default App;
