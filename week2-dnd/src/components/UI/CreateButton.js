import styled from 'styled-components';

const CreateButton = ({ onCreate }) => {
  const newIssueHandler = () => {
    onCreate();
  };

  return <CreateNew onClick={newIssueHandler}>+ 새로 만들기</CreateNew>;
};

const CreateNew = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  height: 35px;
  text-align: start;
  text-indent: 5px;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  color: #808080;
  cursor: pointer;

  &:hover {
    background-color: #f4f4f4;
  }
`;

export default CreateButton;
