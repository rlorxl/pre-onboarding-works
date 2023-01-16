import { forwardRef, useState } from 'react';
import styled from 'styled-components';
import usePost from '../../hooks/usePost';

const EditIssue = forwardRef(
  ({ onCreate, editing = false, onCloseEdit, issue }, ref) => {
    const initialState = !issue ? '' : issue.title;
    const [title, setTitle] = useState(initialState);

    const { updateIssue } = usePost();

    const setNameHandler = ({ target }) => {
      setTitle(target.value);
    };

    const submitHandler = () => {
      if (!editing) {
        onCreate(title);
      } else {
        const newIssue = { ...issue, title: title };
        updateIssue(newIssue);
        onCloseEdit();
      }
    };

    return (
      <ListItem>
        <input
          type='text'
          placeholder='제목을 입력하세요.'
          value={title}
          onChange={setNameHandler}
          ref={ref}
        />
        <button onClick={submitHandler}>완료</button>
      </ListItem>
    );
  }
);

const ListItem = styled.li`
  width: 100%;
  height: 45px;
  border: 1px solid #c1c1c1;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  line-height: 44px;
  text-indent: 8px;
  margin-bottom: 5px;
  font-size: 15px;
  font-weight: 500;
  color: grey;
  cursor: pointer;

  input {
    width: 75%;
    height: 90%;
    border: none;
    outline: none;
  }
`;

export default EditIssue;
