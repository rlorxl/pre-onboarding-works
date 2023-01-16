import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import TodoCard from '../components/todo/TodoCard';
import TodoContext from '../store/todoContext';

function MainPage() {
  const todoInputRef = useRef();

  const { getSyncTodos, createTodo, todosData } = useContext(TodoContext);

  const createTodoItem = e => {
    e.preventDefault();
    createTodo(todoInputRef.current.value);
    todoInputRef.current.value = '';
  };

  useEffect(() => {
    getSyncTodos();
  }, []); // dependency로 getSyncTodos를 추가하면 getSyncTodos를 무한 호출하는데 useCallback을 썻는데도 무한 호출되는 이유?

  return (
    <StMainContainer>
      <StFormContainer onSubmit={createTodoItem}>
        <input id="todo-input" ref={todoInputRef} placeholder="할일을 입력해주세요." />
        <button>+</button>
      </StFormContainer>
      <StListContainer>
        {todosData.length === 0 && <div className="empty-notice">아직 할일이 없어요!</div>}
        {todosData.map(todo => {
          return <TodoCard info={todo} key={todo.id} />;
        })}
      </StListContainer>
    </StMainContainer>
  );
}

const StMainContainer = styled.div`
  width: 128rem;
  height: 95vh;
  padding: 2rem 0;
  background-color: #fcffe7;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StFormContainer = styled.form`
  width: 90%;
  height: 10rem;
  border-bottom: 0.4rem solid #eb455f;
  padding: 0 2rem 1rem 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  #todo-input {
    flex: 1;
    height: 7rem;
    font-size: 2.5rem;
    background: none;
    border: none;
  }
  button {
    width: 7rem;
    height: 7rem;
    margin-left: 3rem;
    font-size: 3rem;
    background: none;
    color: #2b3467;
    font-weight: bold;
    border: 0.4rem solid #2b3467;
    cursor: pointer;
    border-radius: 50%;
  }
`;

const StListContainer = styled.div`
  flex: 1;
  width: 90%;
  padding: 0 2rem;
  background-color: #bad7e9;
  border: 0.3rem solid #2b3467;
  overflow-y: scroll;
  padding-top: 1rem;
  .empty-notice {
    height: 100%;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default MainPage;
