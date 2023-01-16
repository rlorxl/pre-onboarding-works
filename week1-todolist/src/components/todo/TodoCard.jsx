import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import TodoContext from '../../store/todoContext';

function TodoCard({ info }) {
  const { id, todo, isCompleted } = info;
  const [isEdit, setIsEdit] = useState(false);

  const modifyInputRef = useRef();

  const { deleteTodo, updateTodo } = useContext(TodoContext);

  const updateTodoHandler = () => {
    const editFormData = {
      todo: todo,
      isCompleted: !isCompleted,
    };
    updateTodo(id, editFormData);
  };

  const submitHandler = () => {
    const editFormData = {
      todo: modifyInputRef.current.value,
      isCompleted: isCompleted,
    };
    updateTodo(id, editFormData);
    setIsEdit(false);
  };

  const deleteTodoHandler = () => {
    deleteTodo(id);
  };

  return (
    <StCardBody>
      {!isEdit ? (
        <>
          <div className="input-wrapper">
            <StyledInput
              id={id}
              type="checkbox"
              checked={isCompleted}
              onChange={updateTodoHandler}
            />
            <StyledLable htmlFor={id}>{`할일: ${todo}`}</StyledLable>
          </div>
          <div className="btn-wrapper">
            <button className="todo-modify-btn" onClick={() => setIsEdit(true)}>
              수정
            </button>
            <button className="todo-delete-btn" onClick={deleteTodoHandler}>
              삭제
            </button>
          </div>
        </>
      ) : (
        <StModifyFormContainer onSubmit={submitHandler}>
          <input className="user-modify-input" ref={modifyInputRef} />
          <div className="btn-wrapper">
            <button type="submit" className="modify-complete-btn">
              완료
            </button>
            <button type="button" className="modify-cancel-btn" onClick={() => setIsEdit(false)}>
              취소
            </button>
          </div>
        </StModifyFormContainer>
      )}
    </StCardBody>
  );
}

const StCardBody = styled.div`
  width: 100%;
  height: 8rem;
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  margin-bottom: 1rem;
  background-color: #ffffff;
  .btn-wrapper {
    button {
      width: 5.5rem;
      height: 5.5rem;
      background: none;
      border: 0.2rem solid #2b3467;
      border-radius: 50%;
      :nth-of-type(1) {
        margin-right: 1rem;
      }
      :hover {
        background-color: #eeeeee;
        cursor: pointer;
      }
    }
  }
`;

const StModifyFormContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  input {
    flex: 1;
    margin-right: 2rem;
    height: 5rem;
    font-size: 2.5rem;
  }
`;

const StyledInput = styled.input`
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  width: 2rem;
  height: 2rem;
  padding: 1.5rem;
  cursor: pointer;
  position: relative;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #2b3467;
  }
`;

const StyledLable = styled.label`
  position: relative;
  top: -1.1rem;
  padding: 10px;
`;

export default TodoCard;
