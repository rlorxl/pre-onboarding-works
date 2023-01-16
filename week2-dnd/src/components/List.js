import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { shiftStatusName } from '../lib/status';
import usePost from '../hooks/usePost';

import Issue from './Issue';
import EditIssue from './edit/EditIssue';
import CreateButton from './UI/CreateButton';

const List = ({ issue, status }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [sortingIssues, setSortingIssues] = useState([]);

  const EditInputRef = useRef();

  const { createIssue } = usePost();

  const closeEdit = () => {
    setIsEditing(false);
  };

  const createNewHandler = (title) => {
    if (!title || title === undefined) {
      setIsEditing(true);
    } else {
      const newIssueData = {
        title: title,
        content: '',
        status: shiftStatusName(status),
        date: '',
        assign: '',
      };
      createIssue(newIssueData);
      closeEdit();
    }
  };

  useEffect(() => {
    if (issue?.length > 0) {
      const transformedIssue = issue.sort((a, b) => a.id - b.id);
      setSortingIssues(transformedIssue);
    }
  }, [issue]);

  return (
    <ListWrap>
      <h1>{status}</h1>
      <ul draggable>
        {sortingIssues?.map((issue, idx) => (
          <Issue key={idx} contents={issue} />
        ))}
        {isEditing && (
          <EditIssue
            onCreate={createNewHandler}
            status={status}
            ref={EditInputRef}
          />
        )}
      </ul>
      <CreateButton onCreate={createNewHandler} />
    </ListWrap>
  );
};

const ListWrap = styled.div`
  width: 280px;
  display: flex;
  flex-flow: column wrap;
`;

export default List;
