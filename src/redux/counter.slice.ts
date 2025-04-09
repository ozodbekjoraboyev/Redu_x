import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    todoss: [
      {
        name: "Ozodbek",
        id: 1,
      },
    ],
  },
  reducers: {
    addTodos: (state, { payload }) => {
      state.todoss = [
        {
          name: payload,
          id: Math.floor(Math.random() * 100),
        },
        ...state.todoss,
      ];
    },
    deleteTodos: (state, { payload }) => {
      state.todoss = state.todoss.filter((todo) => todo.id !== payload);
    },
    EditTodos: (state, { payload }) => {
      const index = state.todoss.find((todo) => todo.id === payload.id);
      console.log(payload);

      if (index) {
        index.name = payload.name;
      }
    },
  },
});

export const { addTodos, deleteTodos, EditTodos } = counterSlice.actions;
