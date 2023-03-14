export enum STATUS {
  PENDING = "pending",
  PROGRESS = "progress",
  DONE = "done",
}

export interface ITask {
  id: number;
  name: string;
  status: STATUS;
  ordered: number;
}

export interface ISingleBoard {
  status: STATUS;
  onEditHandler: Function;
  draggableId: number;
  setDraggableId: Function;
}
