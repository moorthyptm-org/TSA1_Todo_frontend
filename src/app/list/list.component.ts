import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITodoListModel } from '../store/todo.reducer';
import { DoneTodo } from '../store/todo.actions';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  todoList$: Observable<ITodoListModel>;

  get username() {
    return this.authService.userInfo.username;
  }
  constructor(
    private store: Store<{ TodoList: ITodoListModel }>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.todoList$ = this.store.select('TodoList');
  }

  onDone(todoId: number, index: number): void {
    this.store.dispatch(new DoneTodo(todoId, index));
  }
}
