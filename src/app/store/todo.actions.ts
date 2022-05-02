import { Action } from '@ngrx/store';
import { TodoList } from '../todo.model';

export const ADD = '[ToDo] Add';
export const FETCH = '[ToDo] FETCH';
export const LOAD = '[ToDo] Load';
export const EDIT_START = '[ToDo] Edit_Start';
export const EDIT = '[ToDo] Edit';
export const DONE = '[ToDo] Done';
export const DELETE = '[ToDo] Delete';

export interface IToDo {
  title: string;
  comment: string;
}

export class AddTodo implements Action {
  readonly type = ADD;
  constructor(public payload: IToDo) {}
}
export class FetchTodo implements Action {
  readonly type = FETCH;
  constructor() {}
}
export class LoadTodo implements Action {
  readonly type = LOAD;
  constructor(public payload: TodoList[]) {}
}

export class StartEditTodo implements Action {
  readonly type = EDIT_START;
  constructor(public payload: number) {}
}

export class EditTodo implements Action {
  readonly type = EDIT;
  constructor(public todoId: number, public payload: IToDo) {}
}

export class DoneTodo implements Action {
  readonly type = DONE;
  constructor(public todoId: number, public payload: number) {}
}

export class DeleteTodo implements Action {
  readonly type = DELETE;
  constructor(public todoId: number, public payload: number) {}
}

export type TodoActions =
  | AddTodo
  | EditTodo
  | StartEditTodo
  | DoneTodo
  | DeleteTodo
  | LoadTodo
  | FetchTodo;
