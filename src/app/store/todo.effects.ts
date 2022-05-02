import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, switchMap } from 'rxjs';
import * as TodoActions from '../store/todo.actions';
import { TodoService } from '../todo.service';

@Injectable()
export class TodoEffects {
  fetchTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.FETCH),
      mergeMap(() => {
        return this.todoService.fetchTodos().pipe(
          map((todos) => new TodoActions.LoadTodo(todos['data'])),
          catchError(() => EMPTY)
        );
      })
    )
  );
  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.ADD),
      mergeMap((action: TodoActions.AddTodo) => {
        return this.todoService
          .addTodo({ ...action.payload, addedOn: new Date() })
          .pipe(
            map(() => new TodoActions.FetchTodo()),
            catchError(() => EMPTY)
          );
      })
    )
  );
  editTodo$ = createEffect(
    (): any =>
      this.actions$.pipe(
        ofType(TodoActions.EDIT),
        switchMap((action: TodoActions.EditTodo) => {
          return this.todoService.editTodo(action.todoId, action.payload);
        })
      ),
    { dispatch: false }
  );
  deleteTodo$ = createEffect(
    (): any =>
      this.actions$.pipe(
        ofType(TodoActions.DELETE),
        switchMap((action: TodoActions.DeleteTodo) => {
          return this.todoService.deleteTodo(action.todoId);
        })
      ),
    { dispatch: false }
  );
  markDoneTodo$ = createEffect(
    (): any =>
      this.actions$.pipe(
        ofType(TodoActions.DONE),
        switchMap((action: TodoActions.DoneTodo) => {
          return this.todoService.markDone(action.todoId);
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
