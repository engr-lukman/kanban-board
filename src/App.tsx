import { APP_NAME } from "utils/AppConstant";
import TodoFeature from "features/todo";

function App() {
  return (
    <div className="container flex-1 w-full min-h-screen overflow-hidden overflow-y-auto bg-white">
      <div className="flex justify-center w-auto h-auto bg-gray-200 mx-10 my-4 px-10 py-4">
        <div className="w-full p-2">
          <h1 className="text-xl font-bold text-center">{APP_NAME}</h1>
          <TodoFeature />
        </div>
      </div>
    </div>
  );
}

export default App;
