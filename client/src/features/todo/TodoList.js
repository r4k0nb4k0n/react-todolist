import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { selectTodos } from "./todoSlice";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
  background: transparent;
`;

function TodoList() {
  const todos = useSelector(selectTodos);
  return (
    <TodoListBlock>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          content={todo.content}
          completed={todo.completed}
        />
      ))}
    </TodoListBlock>
  );
}

export default TodoList;
