import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import "./styles/index.css";

import App from "./App";
import { store } from "./store";
import { saveTaskToStore } from "store/slices/task.slice";
import { LOCAL_STORAGE_KEY_NAME } from "utils/AppConstant";
import { getStorage } from "utils/helpers";

const taskList = getStorage(LOCAL_STORAGE_KEY_NAME);
const checkTaskList = taskList ? JSON.parse(taskList) : [];
if (checkTaskList && !!checkTaskList?.length) {
  store.dispatch(saveTaskToStore(checkTaskList));
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
