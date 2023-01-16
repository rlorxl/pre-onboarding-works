import styled from 'styled-components';

const BoardContainer = (props) => {
  return <BoardWrap>{props.children}</BoardWrap>;
};

const BoardWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
`;

export default BoardContainer;
