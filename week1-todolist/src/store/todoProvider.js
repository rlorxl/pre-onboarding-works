import { useCallback, useMemo, useState } from 'react';
import useHttp from '../hooks/useHttp';
import TodoContext from './todoContext';

const TodoContextProvider = props => {
  const [todosData, setTodosData] = useState([]);

  const { sendRequest } = useHttp();

  const setTodo = useCallback((payload, todoData) => {
    const { method, todoId: id } = payload;

    switch (method) {
      case 'GET':
        setTodosData(todoData);
        break;
      case 'CREATE':
        setTodosData(prev => [...prev, todoData]);
        break;
      case 'DELETE':
        setTodosData(prev => prev.filter(todo => todo.id !== id));
        break;
      case 'UPDATE':
        setTodosData(prev => prev.map(todo => (todo.id === id ? todoData : todo)));
        break;
      default:
        return;
    }
  }, []);

  const getSyncTodos = useCallback(async () => {
    await sendRequest({ method: 'GET' }, setTodo.bind(null, { method: 'GET' }));
  }, [sendRequest, setTodo]);

  const createTodo = useCallback(
    async todo => {
      await sendRequest(
        { method: 'CREATE', payload: { todo: todo } },
        setTodo.bind(null, { method: 'CREATE' })
      );
    },
    [sendRequest, setTodo]
  );

  const deleteTodo = useCallback(
    async todoId => {
      await sendRequest(
        { method: 'DELETE', payload: todoId },
        setTodo.bind(null, { method: 'DELETE', todoId })
      );
    },
    [sendRequest, setTodo]
  );

  const updateTodo = useCallback(
    async (todoId, editData) => {
      await sendRequest(
        { method: 'UPDATE', payload: editData, todoId },
        setTodo.bind(null, { method: 'UPDATE', todoId })
      );
    },
    [sendRequest, setTodo]
  );

  const todos = useMemo(
    () => ({
      todosData,
      getSyncTodos,
      createTodo,
      deleteTodo,
      updateTodo,
    }),
    [todosData, getSyncTodos, createTodo, deleteTodo, updateTodo]
  );

  return <TodoContext.Provider value={todos}>{props.children}</TodoContext.Provider>;
};

export default TodoContextProvider;
