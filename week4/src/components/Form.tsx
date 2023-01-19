import { ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import useForm from '../hooks/useForm';
import { comment, fetchCommentData, page } from '../store/commentSlice';
import { useAppDispatch, useAppSelector } from '../store/configStore';

const Form = () => {
  const dispatch = useAppDispatch();
  const commentData = useAppSelector(comment);
  const currentPage = useAppSelector(page);

  const { formData, setForm, resetForm } = useForm();

  const setEnteredData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm({ name, value });
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!commentData.id) {
      dispatch(fetchCommentData('CREATE', formData));
      dispatch(fetchCommentData('GETPAGE', 1));
    } else {
      dispatch(
        fetchCommentData('UPDATE', {
          commentId: commentData.id,
          newComment: formData,
        })
      );
      dispatch(fetchCommentData('GETPAGE', currentPage));
    }

    resetForm();
  };

  return (
    <FormStyle>
      <form onSubmit={submitForm}>
        <input
          type='text'
          name='profile_url'
          placeholder='https://picsum.photos/id/1/50/50'
          required
          value={formData.profile_url}
          onChange={setEnteredData}
        />
        <br />
        <input
          type='text'
          name='author'
          placeholder='작성자'
          value={formData.author}
          onChange={setEnteredData}
        />
        <br />
        <textarea
          name='content'
          placeholder='내용'
          required
          value={formData.content}
          onChange={setEnteredData}
        ></textarea>
        <br />
        <input
          type='text'
          name='createdAt'
          placeholder='2020-05-30'
          required
          value={formData.createdAt}
          onChange={setEnteredData}
        />
        <br />
        <button type='submit'>등록</button>
      </form>
    </FormStyle>
  );
};

const FormStyle = styled.div`
  & > form {
    padding: 0 10px;
    margin-bottom: 50px;
  }
  & > form > textarea {
    padding: 5px 1%;
    width: 98%;
    height: 50px;
  }
  & > form > input[type='text'] {
    padding: 5px 1%;
    width: 98%;
    margin-bottom: 10px;
  }
  & > form > button {
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;

export default Form;
