import { useCallback } from 'react';
import { todoAPI } from '../api/api';

const apiRoute = {
  GET: todoAPI.getTodos,
  GET_ID: todoAPI.getTodoById,
  CREATE: todoAPI.createTodo,
  DELETE: todoAPI.deleteTodo,
  UPDATE: todoAPI.updateTodo,
};

const useHttp = () => {
  const sendRequest = useCallback(async (config, applyFunc) => {
    const { method, payload, todoId } = config;

    const API_ROUTE = apiRoute[method];

    try {
      const response = todoId ? await API_ROUTE(todoId, payload) : await API_ROUTE(payload);
      applyFunc(response.data);
    } catch (error) {
      alert(error.message);
      // console.log(error);
    }
  }, []);

  return { sendRequest };
};

export default useHttp;
