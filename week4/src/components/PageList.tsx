import { useEffect } from 'react';
import styled from 'styled-components';
import {
  fetchCommentData,
  list,
  page,
  pagenationList,
} from '../store/commentSlice';
import { useAppDispatch, useAppSelector } from '../store/configStore';

const PageList = () => {
  const dispatch = useAppDispatch();
  const CommentList = useAppSelector(list);
  const currentPage = useAppSelector(page);
  const pagenation = useAppSelector(pagenationList);

  const pageNationHandler = (pageNum: number) => {
    dispatch(fetchCommentData('GETPAGE', pageNum));
  };

  useEffect(() => {
    dispatch(fetchCommentData('GETALL'));
  }, [CommentList]);

  return (
    <PageListStyle>
      {pagenation &&
        pagenation.map((pageNm) => (
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
