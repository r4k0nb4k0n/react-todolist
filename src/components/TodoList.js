import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
  background: transparent;
`;

function TodoList() {
  return (
    <TodoListBlock>
      <TodoItem text="프로젝트 생성하기" done={true}></TodoItem>
      <TodoItem text="프로젝트 생성하기" done={true}></TodoItem>
      <TodoItem text="프로젝트 생성하기" done={false}></TodoItem>
      <TodoItem text="프로젝트 생성하기" done={false}></TodoItem>
    </TodoListBlock>
  );
}

export default TodoList;
