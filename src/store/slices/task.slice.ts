import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ITask } from "models/task.model";
import ReducerNames from "store/ReducerNames";
import type { RootState } from "store";
import { setStorage } from "utils/helpers";
import { LOCAL_STORAGE_KEY_NAME } from "utils/AppConstant";

// declaring the types for state
export type TaskState = {
  list: ITask[];
};

const initialState: TaskState = { list: [] };

export const taskSlice = createSlice({
  name: ReducerNames.TASKS,
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    saveTaskToStore: (state, action: PayloadAction<ITask[]>) => {
      const list: ITask[] = action.payload.sort(
        (a, b) => a.ordered - b.ordered
      );

      state.list = [...list];
      setStorage(LOCAL_STORAGE_KEY_NAME, JSON.stringify(state.list));
    },
  },
});

// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { saveTaskToStore } = taskSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const getTasks = (state: RootState) => state.tasks.list;

// exporting the reducer here, as we need to add this to the store
export default taskSlice.reducer;
