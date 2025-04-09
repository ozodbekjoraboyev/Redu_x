import { configureStore, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
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
      const index = state.todoss.findIndex((todo) => todo.id === payload.id);

      if (index !== -1) {
        state.todoss[index].name = payload.name;
      }
    },
  },
});

export const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});
export const { addTodos, deleteTodos, EditTodos } = counterSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
