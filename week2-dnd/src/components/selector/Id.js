import styled from 'styled-components';

const Id = ({ content }) => {
  return <Selector>{content}</Selector>;
};

const Selector = styled.div`
  width: 240px;
  border-radius: 25px;
  line-height: 2;
`;

export default Id;
