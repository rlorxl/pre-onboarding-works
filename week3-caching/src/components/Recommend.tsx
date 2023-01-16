/* eslint-disable import/extensions */
import { useState } from 'react';
import styled from 'styled-components';
import { Result } from '../types/sick-types';
import Word from './Word';

type Props = {
  result: Result[] | undefined;
  text: string;
};

const Recommend = ({ result, text }: Props) => {
  const [itemIndex, setItemIndex] = useState<number>(0);

  const keydownHandler = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'ArrowDown') {
      if (itemIndex === result!.length - 1) setItemIndex(-1);
      setItemIndex(prev => prev + 1);
    }
    if (e.key === 'ArrowUp') {
      if (itemIndex === 0) setItemIndex(result!.length);
      setItemIndex(prev => prev - 1);
    }
  };

  return (
    <RecommendWrap>
      <p>추천 검색어</p>
      <ul onKeyDown={keydownHandler}>
        {result?.length === 0 && <p>검색어 없음.</p>}
        {result?.map((item, index) => (
          <Word
            key={item.sickCd}
            name={item.sickNm}
            text={text}
            focus={index === itemIndex}
          />
        ))}
      </ul>
    </RecommendWrap>
  );
};

const RecommendWrap = styled.div`
  width: 100%;
  margin-top: 10px;
  background: #fff;
  border-radius: 25px;
  padding: 20px;

  p {
    color: #828282;
    margin-bottom: 8px;
  }

  ul {
    width: 100%;
    max-height: 550px;
    overflow-y: scroll;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export default Recommend;
