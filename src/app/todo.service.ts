import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IToDo } from './store/todo.actions';
import { ITodoCreatePayload, ITodoReponse, TodoList } from './todo.model';
import { IMessage } from './users/users.model';

@Injectable()
export class TodoService {
  todoList: Array<TodoList> = [];

  constructor(private http: HttpClient) {}

  fetchTodos(): Observable<ITodoReponse> {
    return this.http.get<ITodoReponse>(environment.host + '/todos');
  }
  addTodo(payload: ITodoCreatePayload): Observable<IMessage> {
    return this.http.post<IMessage>(environment.host + '/todos', payload);
  }

  editTodo(todoId: number, payload: IToDo): Observable<IMessage> {
    return this.http.put<IMessage>(
      environment.host + '/todos/' + todoId,
      payload
    );
  }
  markDone(todoId: number): Observable<IMessage> {
    return this.http.patch<IMessage>(
      environment.host + '/todos/' + todoId + '/mark-done',
      {}
    );
  }
  deleteTodo(todoId: number): Observable<IMessage> {
    return this.http.delete<IMessage>(environment.host + '/todos/' + todoId);
  }
}
