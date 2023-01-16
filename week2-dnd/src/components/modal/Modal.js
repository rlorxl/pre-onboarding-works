import { useState } from 'react';
import { RxDoubleArrowRight } from 'react-icons/rx';
import styled from 'styled-components';
import usePost from '../../hooks/usePost';
import Selector from './Selector';

const Modal = ({ info, onClose }) => {
  const { id, title, content, date, status, assign } = info;

  const { updateIssue } = usePost();

  const [selectorValues, setSelectorValues] = useState({
    id: id,
    title: title,
    content: content,
    date: date,
    status: status,
    assign: assign,
  });

  const titleInputHandler = ({ target }) => {
    setSelectorValues((prev) => {
      return { ...prev, title: target.value };
    });
  };

  const textValueHandler = ({ target }) => {
    setSelectorValues((prev) => {
      return { ...prev, content: target.value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    updateIssue(selectorValues);
    onClose();
  };

  return (
    <ModalWrap onSubmit={submitHandler}>
      <RightArrowIcon onClick={() => onClose()}>
        <RxDoubleArrowRight />
      </RightArrowIcon>
      <TitleInput
        type='text'
        value={selectorValues.title}
        onChange={titleInputHandler}
      />
      <CategoryArea>
        <Selector
          title='Status'
          content={selectorValues.status}
          setValue={setSelectorValues}
        />
        <Selector
          title='Assign'
          content={selectorValues.assign}
          setValue={setSelectorValues}
        />
        <Selector title='Date' content={<input type='datetime-local' />} />
        <Selector title='ID' content={id} />
      </CategoryArea>
      <ContentWrap>
        <textarea
          placeholder='내용을 입력해 주세요.'
          value={selectorValues.content}
          onChange={textValueHandler}
        />
      </ContentWrap>
      <SaveButtonWrap>
        <button>저장</button>
      </SaveButtonWrap>
    </ModalWrap>
  );
};

const ModalWrap = styled.form`
  position: relative;
  height: 100%;
`;

const RightArrowIcon = styled.div`
  width: 30px;
  font-size: 1.5rem;
  color: grey;
  cursor: pointer;
  margin-bottom: 18px;
`;

const TitleInput = styled.input`
  width: 100%;
  font-size: 34px;
  font-weight: 700;
  border: none;
  outline: none;
  margin-bottom: 18px;
`;

const CategoryArea = styled.div`
  padding-bottom: 18px;
  border-bottom: 1px solid #c7c7c7;
`;

const ContentWrap = styled.div`
  padding-top: 24px;

  textarea {
    width: 100%;
    min-height: 300px;
    line-height: 1.5;
    border: none;
    outline: none;
    font-size: 16px;
    resize: none;
  }
`;

const SaveButtonWrap = styled.div`
  position: absolute;
  bottom: 70px;
  right: 0;

  button {
    padding: 12px 20px;
    font-size: 16px;
    font-weight: 500;
    color: grey;
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
`;

export default Modal;
