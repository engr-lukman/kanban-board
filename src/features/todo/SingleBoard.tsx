import { toast } from "react-toastify";

import { EditIcon, TrashIcon } from "utils/Icons";
import { ISingleBoard, ITask, STATUS } from "models/task.model";
import { useAppDispatch, useAppSelector } from "hooks/store.hooks";
import { getTasks, saveTaskToStore } from "store/slices/task.slice";
import { LABELS } from "utils/AppConstant";

function SingleBoard(props: ISingleBoard) {
    const { status, onEditHandler, draggableId, setDraggableId } = props;

    const dispatch = useAppDispatch();
    const tasks: ITask[] = useAppSelector(getTasks);

    const onDeleteHandler = (deletedId: number) => {
        const updatedTaskList = tasks?.filter((task) => task?.id !== deletedId);
        dispatch(saveTaskToStore(updatedTaskList));
        toast.success(`Successfully deleted.`);
    };

    const onDragOverHandler = (e: any) => {
        e.preventDefault();
    };

    const onDropHandler = (status: STATUS) => {
        const updatedTaskList = tasks?.map((task) =>
            task.id === draggableId ? { ...task, status, ordered: Date.now() } : task
        );

        dispatch(saveTaskToStore(updatedTaskList));
        setDraggableId(0);
    };

    return (
        <div
            onDragOver={onDragOverHandler}
            onDrop={() => onDropHandler(status)}
            className="w-2/6 min-h-[70vh] border border-black"
        >
            <h2 className="w-full bg-orange-700 text-center font-bold py-1 px-2">
                {LABELS[status]}
            </h2>
            <ul className="p-2 space-y-2">
                {tasks
                    ?.filter((filterTask) => filterTask?.status === status)
                    .map((task) => (
                        <li
                            key={task?.id}
                            draggable
                            onDragStart={() => setDraggableId(task?.id)}
                            className="flex justify-between p-1 border border-black"
                        >
                            <span className="w-full cursor-move">{task?.name}</span>
                            <div className="w-20 space-x-1 text-right">
                                <button
                                    onClick={() => onDeleteHandler(task?.id)}
                                    className="text-red-600 text-xs"
                                >
                                    <TrashIcon />
                                </button>
                                <button
                                    onClick={() => onEditHandler(task)}
                                    className="text-yellow-600 text-xs"
                                >
                                    <EditIcon />
                                </button>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default SingleBoard;