import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { GrFormSearch } from 'react-icons/gr';

type WordProps = {
  name: string;
  text: string;
  focus: boolean;
};

const Word = ({ name, text, focus }: WordProps) => {
  const wordRef = useRef<HTMLLIElement>(null);

  const tabIndex: number = focus ? 0 : 1;

  useEffect(() => {
    if (tabIndex === 0) wordRef.current!.focus();
  });

  return (
    <WordWrap tabIndex={tabIndex} ref={wordRef}>
      <GrFormSearch />
      {name.split(text)[0]}
      <Bold>{text}</Bold>
      {name.split(text)[1]}
    </WordWrap>
  );
};

const WordWrap = styled.li`
  color: #454545;
  padding: 8px 0;
  outline: none;
  display: flex;

  &:focus {
    background-color: #f5f5f5;
    border-radius: 5px;
  }

  svg {
    font-size: 1.2rem;
    margin-right: 5px;
  }
`;

const Bold = styled.span`
  font-weight: 700;
  color: #000;
`;

export default Word;
