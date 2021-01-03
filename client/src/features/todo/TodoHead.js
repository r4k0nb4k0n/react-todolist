import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectTodos } from "./todoSlice";

const TodoHeadBlock = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid gray;
  h1 {
    margin: 0;
    font-size: 32px;
    color: white;
  }
  .day {
    font-size: 21px;
    color: darkgray;
  }
  .tasks-left {
    color: #02feff;
    font-weight: bold;
    margin-top: 40px;
  }
`;

function TodoHead() {
  const todos = useSelector(selectTodos);
  const today = new Date();
  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dayName = today.toLocaleDateString("ko-KR", { weekday: "long" });
  return (
    <>
      <TodoHeadBlock>
        <h1>{dateString}</h1>
        <div className="day">{dayName}</div>
        <div className="tasks-left">
          할 일 {todos.filter((todo) => todo.done === false).length}개 남음
        </div>
      </TodoHeadBlock>
    </>
  );
}

export default TodoHead;
