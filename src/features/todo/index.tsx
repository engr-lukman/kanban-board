import { useState } from "react";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "hooks/store.hooks";
import { saveTaskToStore, getTasks } from "store/slices/task.slice";
import { ITask, STATUS } from "models/task.model";
import SingleBoard from "./SingleBoard";

function TodoFeature() {
    const dispatch = useAppDispatch();
    const tasks: ITask[] = useAppSelector(getTasks);
    const [taskName, setTaskName] = useState<string>("");
    const [editableId, setEditableId] = useState<number>(0);
    const [draggableId, setDraggableId] = useState(0);

    const onSubmitHandler = () => {
        if (!taskName) {
            toast.error("Task field is required.");
            return false;
        }

        let taskList: ITask[] = [];

        if (!!editableId) {
            taskList = tasks?.map((task) =>
                task?.id === editableId ? { ...task, name: taskName, ordered: Date.now() } : task
            );
        } else {
            const newTask: ITask = {
                id: Date.now(),
                name: taskName,
                status: STATUS.PENDING,
                ordered: Date.now(),
            };
            taskList = [...tasks, { ...newTask }];
        }

        dispatch(saveTaskToStore(taskList));
        toast.success(`"${taskName}" successfully saved.`);
        reset();
    };

    const onEditHandler = (task: ITask) => {
        setTaskName(task?.name);
        setEditableId(task?.id);
    };

    const reset = () => {
        setTaskName("");
        setEditableId(0);
    };

    return (
        <>
            <div className="flex justify-center space-x-4 mt-4">
                <input
                    name="taskName"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    className="border border-black p-1 w-72"
                    placeholder="Write your task..."
                />
                <button
                    onClick={onSubmitHandler}
                    type="button"
                    className="w-24 bg-green-700 rounded-md py-1 px-4 text-white"
                >
                    {!!editableId ? "Update" : "Add"}
                </button>
            </div>
            <div className="flex w-full justify-between space-x-10 mt-4">
                {
                    Object.values(STATUS).map((status) =>
                        <SingleBoard
                            key={status}
                            status={status}
                            onEditHandler={onEditHandler}
                            draggableId={draggableId}
                            setDraggableId={setDraggableId}
                        />
                    )
                }
            </div>
        </>
    );
}

export default TodoFeature;
