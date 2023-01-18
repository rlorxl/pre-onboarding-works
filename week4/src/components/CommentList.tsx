import styled from 'styled-components';
import {
  deleteComment,
  fetchComment,
  fetchPage,
  list,
  page,
} from '../store/commentSlice';
import { useAppDispatch, useAppSelector } from '../store/configStore';

const CommentList = () => {
  const dispatch = useAppDispatch();

  const commentList = useAppSelector(list);
  const currentPage = useAppSelector(page);

  const deleteCommentHandler = (commentId?: number) => {
    if (commentId === undefined) return;
    dispatch(deleteComment(commentId));
    dispatch(fetchPage(1));
  };

  const updateCommentHandler = async (commentId?: number) => {
    if (commentId === undefined) return;
    dispatch(fetchComment(commentId));
    dispatch(fetchPage(currentPage));
  };

  return (
    <>
      {commentList.map((comment, key) => (
        <Comment key={key}>
          <img src={comment.profile_url} alt='' />
          {comment.author}
          <CreatedAt>{comment.createdAt}</CreatedAt>
          <Content>{comment.content}</Content>
          <Button>
            <a onClick={updateCommentHandler.bind(null, comment.id)}>수정</a>
            <a onClick={deleteCommentHandler.bind(null, comment.id)}>삭제</a>
          </Button>
          <hr />
        </Comment>
      ))}
    </>
  );
};

const Comment = styled.div`
  padding: 7px 10px;
  text-align: left;
  & > img {
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

const CreatedAt = styled.div`
  float: right;
  vertical-align: middle;
`;

const Content = styled.div`
  margin: 10px 0;
`;

const Button = styled.div`
  text-align: right;
  margin: 10px 0;
  & > a {
    margin-right: 10px;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    background-color: #fff;
    cursor: pointer;
  }
`;

export default CommentList;
