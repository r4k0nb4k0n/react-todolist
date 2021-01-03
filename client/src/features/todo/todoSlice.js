import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    loading: false,
    error: false,
    errorMessage: "",
  },
  reducers: {
    fetchAll: (state, action) => {
      state.todos = action.payload;
    },
    doing: (state) => {
      state.loading = true;
    },
    doingSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    doingFailure: (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    addTodo: (state, action) => {
      state.todos = [
        ...state.todos,
        {
          id: action.payload.id,
          content: action.payload.content,
          completed: action.payload.completed,
        },
      ];
    },
    /* {
      reducer(state, action) {
        const { id, content } = action.payload;
        state.todos.push({ id, content, completed: false });
      },
      prepare(content) {
        return { payload: { content, id: nextTodoId++ } };
      },
    }, */
    toggleTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        return {
          id: todo.id,
          content: todo.content,
          completed:
            todo.id === action.payload ? !todo.completed : todo.completed,
        };
      });
      console.log(state.todos);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const {
  fetchAll,
  doing,
  doingSuccess,
  doingFailure,
  addTodo,
  toggleTodo,
  removeTodo,
} = todoSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchAllTodos = () => {
  return async (dispatch) => {
    try {
      dispatch(doing());
      const response = await axios.get("/api/todos");
      console.log(response);
      dispatch(fetchAll(response.data));
      dispatch(doingSuccess());
    } catch (err) {
      dispatch(doingFailure(err.message));
    }
  };
};

export const addTodoAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(doing());
      const response = await axios.post("/api/todos", {
        content: payload,
      });
      console.log(response);
      dispatch(addTodo(response.data));
      dispatch(doingSuccess());
    } catch (err) {
      dispatch(doingFailure(err.message));
    }
  };
};

export const removeTodoAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(doing());
      const response = await axios.delete(`/api/todos/${payload}`);
      console.log(response);
      if (response.data.success) {
        dispatch(removeTodo(payload));
        dispatch(doingSuccess());
      } else {
        throw new Error("Server Error");
      }
    } catch (err) {
      dispatch(doingFailure(err.message));
    }
  };
};

export const toggleTodoAsync = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch(doing());
      const response = await axios.patch(`/api/todos/${payload.id}`, {
        id: payload.id,
        content: payload.content,
        completed: !payload.completed,
      });
      console.log(response);
      dispatch(toggleTodo(payload.id));
      dispatch(doingSuccess());
    } catch (err) {
      console.log(err);
      dispatch(doingFailure(err.message));
    }
  };
};

export const selectTodos = (state) => state.todo.todos;

export default todoSlice.reducer;
