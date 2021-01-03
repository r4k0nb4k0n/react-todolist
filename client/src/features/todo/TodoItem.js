import React from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";
import { toggleTodoAsync, removeTodoAsync } from "./todoSlice";

const Remove = styled.div`
  display: flex;
  align-items: centers;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 2px solid #02feff;
      color: #02feff;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #ced4da;
  ${(props) =>
    props.done &&
    css`
      color: #495057;
      text-decoration: line-through;
    `}
`;

function TodoItem({ id, completed, content }) {
  const dispatch = useDispatch();
  const onToggle = () => dispatch(toggleTodoAsync({ id, content, completed }));
  const onRemove = () => dispatch(removeTodoAsync(id));
  return (
    <TodoItemBlock>
      <CheckCircle done={completed} onClick={onToggle}>
        {completed && <MdDone />}
      </CheckCircle>
      <Text done={completed}>{content}</Text>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);
