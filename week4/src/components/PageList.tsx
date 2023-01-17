import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ApiRequest from '../api/api';
import { fetchPage, page } from '../store/commentSlice';
import { useAppDispatch, useAppSelector } from '../store/configStore';

const LIMIT = 4;

const PageList = () => {
  const [pageArray, setPageArray] = useState<number[]>([]);

  const dispatch = useAppDispatch();

  const currentPage = useAppSelector(page);

  const pageNationHandler = (pageNm: number) => {
    dispatch(fetchPage(pageNm));
  };

  useEffect(() => {
    const fetchAllComments = async () => {
      const response = await ApiRequest.get();

      const pageCount = Math.ceil(response.data.length / LIMIT);

      const newPageArray = Array(pageCount)
        .fill(0)
        .map((_, idx) => idx + 1);

      setPageArray(newPageArray);
    };
    fetchAllComments();
  }, []);

  return (
    <PageListStyle>
      {pageArray.map((pageNm) => (
        <Page
          active={currentPage === pageNm}
          key={pageNm}
          onClick={pageNationHandler.bind(null, pageNm)}
        >
          {pageNm}
        </Page>
      ))}
    </PageListStyle>
  );
};

const PageListStyle = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const Page = styled.button<{ active: boolean }>`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  cursor: pointer;
  ${({ active }) =>
    active &&
    `
        background: gray;
        color: #fff;
  `}
  margin-right: 3px;
`;

export default PageList;
