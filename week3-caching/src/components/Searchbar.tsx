/* eslint-disable import/extensions */
import { useRef, useState } from 'react';
import styled from 'styled-components';
import fetchApi from '../api/api';
import { Result } from '../types/sick-types';
import Recommend from './Recommend';

const Searchbar = () => {
  const [result, setResult] = useState<Result[] | undefined>([]);
  const [showList, setShowList] = useState(false);

  const timer = useRef<NodeJS.Timeout>();
  const searchInputRef = useRef<HTMLInputElement>(null);

  let diseaseVal: string = '';
  if (searchInputRef.current) {
    diseaseVal = searchInputRef.current!.value;
  }

  const debounce = (
    callback: (enteredNm: string) => Promise<void>,
    msec: number
  ): any => {
    const debounceFunc = (enteredNm: string) => {
      if (timer.current !== null) clearTimeout(timer.current);
      timer.current = setTimeout(() => callback(enteredNm), msec);
    };
    return debounceFunc;
  };

  const fetchDiseaseName = debounce(async (value): Promise<void> => {
    if (value.trim() === '') {
      setResult([]);
      return;
    }

    const sickNames = await fetchApi(value);
    setResult(sickNames);
  }, 1000);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    fetchDiseaseName(value);
  };

  return (
    <SearchWrap>
      <SearchForm>
        <input
          type="search"
          name="disease"
          placeholder="질환명을 입력해 주세요."
          autoComplete="off"
          ref={searchInputRef}
          onChange={searchHandler}
          onFocus={() => setShowList(true)}
        />
        <button type="button">검색</button>
      </SearchForm>
      {showList && <Recommend result={result} text={diseaseVal} />}
    </SearchWrap>
  );
};

const SearchWrap = styled.div`
  width: 550px;
  position: absolute;
  top: 30vh;
  left: 50%;
  transform: translateX(-50%);
`;

const SearchForm = styled.form`
  input {
    width: calc(100% - 110px);
    height: 60px;
    padding: 12px;
    border: none;
    border-radius: 25px 0 0 25px;
    font-size: 1.2rem;
    text-indent: 10px;
    outline: none;
  }

  button {
    width: 110px;
    height: 60px;
    font-size: 1.2rem;
    border: none;
    border-radius: 0 25px 25px 0;
    background-color: #5fd955;
    color: #fff;
    font-weight: 800;
  }
`;

export default Searchbar;
