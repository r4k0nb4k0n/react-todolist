import React from "react";
import styled from "styled-components";

const TodoHeadBlock = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solied #e9ecef;
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
  return (
    <>
      <TodoHeadBlock>
        <h1>2020년 12월 28일</h1>
        <div className="day">일요일</div>
        <div className="tasks-left">할 일 2개 남음</div>
      </TodoHeadBlock>
    </>
  );
}

export default TodoHead;
