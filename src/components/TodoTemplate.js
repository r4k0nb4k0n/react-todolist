import React from "react";
import styled from "styled-components";

const TodoTemplateBlock = styled.div`
  width: 50vw;
  height: 80vh;

  position: relative;
  background-color: dark-gray;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 #02feff;

  margin: 0 auto;
  margin-top: 10vh;
  margin-bottom: 10vh;
  display: flex;
  flex-direction: column;

  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

  &::after {
    box-shadow: 0 0 16px 0 #02feff;
    opacity: 0;
    -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  &:hover {
    -webkit-transform: scale(1.05, 1.05);
    transform: scale(1.05, 1.05);
  }

  &:hover::after {
    opacity: 1;
  }
`;

function TodoTemplate({ children }) {
  return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}

export default TodoTemplate;
