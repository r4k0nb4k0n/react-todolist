import React from "react";
import { createGlobalStyle } from "styled-components";
import TodoTemplate from "./components/TodoTemplate";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <TodoTemplate>투두리스트</TodoTemplate>
    </>
  );
}

export default App;
