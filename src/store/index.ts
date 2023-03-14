import { configureStore } from "@reduxjs/toolkit";

import ReducerNames from "./ReducerNames";
import taskReducer from "store/slices/task.slice";

export const store = configureStore({
  reducer: {
    [ReducerNames.TASKS]: taskReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([]),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {tasks: TaskState}
export type AppDispatch = typeof store.dispatch;
