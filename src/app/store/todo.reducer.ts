import { TodoList } from '../todo.model';

import * as TodoActions from '../store/todo.actions';

const initialState: ITodoListModel = {
  data: [],
  editState: false,
  editIndex: null,
};

export interface ITodoListModel {
  data: Array<TodoList>;
  editState: boolean;
  editIndex: number;
}

export function TodoReducer(
  state: ITodoListModel = initialState,
  action: TodoActions.TodoActions
): ITodoListModel {
  switch (action.type) {
    case TodoActions.ADD:
      return {
        ...state,
        data: [
          ...state.data,
          new TodoList(action.payload.title, action.payload.comment),
        ],
      };
    case TodoActions.EDIT_START:
      return {
        ...state,
        editIndex: action.payload,
        editState: true,
      };
    case TodoActions.EDIT:
      const editedData = deepClone(state.data);
      editedData[state.editIndex].title = action.payload.title;
      editedData[state.editIndex].comment = action.payload.comment;
      return {
        ...state,
        data: editedData,
        editState: false,
        editIndex: null,
      };
    case TodoActions.LOAD:
      return {
        ...state,
        data: action.payload,
        editState: false,
        editIndex: null,
      };
    case TodoActions.DONE:
      const markDone = deepClone(state.data);
      markDone[action.payload].status = 1;
      return { ...state, data: markDone };
    case TodoActions.DELETE:
      const deleted = deepClone(state.data);
      deleted.splice(action.payload, 1);
      return { ...state, data: deleted };
    default:
      return state;
  }
}

const deepClone = (data: any) => JSON.parse(JSON.stringify(data));
