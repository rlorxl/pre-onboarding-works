import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { BiEditAlt } from 'react-icons/bi';
import usePost from '../../hooks/usePost';

const Edits = ({ startEdit, id }) => {
  const { deleteIssue } = usePost();

  const deleteIssueHandler = (e) => {
    e.stopPropagation();
    deleteIssue(id);
  };

  const startEditHandler = () => {
    startEdit();
  };

  return (
    <EditsWrap>
      <Edit>
        <BiEditAlt onClick={startEditHandler} />
      </Edit>
      <Delete onClick={deleteIssueHandler}>
        <IoClose />
      </Delete>
    </EditsWrap>
  );
};

const EditsWrap = styled.div`
  position: absolute;
  top: 8px;
  right: 12px;
  width: 50px;
  height: 25px;
  font-size: 20px;
  background: #fff;
  border: 1px solid #c1c1c1;
  border-radius: 4px;
  display: flex;
`;

const Edit = styled.div`
  width: 25px;
  height: 25px;
  border-right: 1px solid #c1c1c1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;

  &:hover {
    background-color: #f4f4f4;
    border-radius: 4px;
  }
`;

const Delete = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #f4f4f4;
    border-radius: 4px;
  }
`;

export default Edits;
