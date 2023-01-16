import React from 'react';

const TodoContext = React.createContext({
  totosData: [],
  getSyncTodos: () => {},
  createTodo: todo => {},
  deleteTodo: id => {},
  updateTodo: (id, todo) => {},
});

export default TodoContext;
