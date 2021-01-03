import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createGlobalStyle } from "styled-components";
import TodoTemplate from "./features/todo/TodoTemplate";
import TodoHead from "./features/todo/TodoHead";
import TodoList from "./features/todo/TodoList";
import TodoCreate from "./features/todo/TodoCreate";
import { fetchAllTodos } from "./features/todo/todoSlice";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
  }
`;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);
  return (
    <>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </>
  );
}

export default App;
