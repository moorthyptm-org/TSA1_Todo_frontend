import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from '../todo.service';
import { ITodoListModel } from '../store/todo.reducer';
import { Store } from '@ngrx/store';
import { TodoList } from '../todo.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  todoList: ITodoListModel;
  listSubscription: Subscription;

  get isUserAuthendicated() {
    return this.authService.isUserAuthendicated;
  }
  constructor(
    private todoService: TodoService,
    private authService: AuthService,
    private store: Store<{ TodoList: ITodoListModel }>
  ) {}
  ngOnInit(): void {
    this.listSubscription = this.store
      .select('TodoList')
      .subscribe((data) => (this.todoList = data));
  }

  public getTodoLength = (): number =>
    this.todoList.data.reduce((ac: any, list) => ac + (list.isDone ? 0 : 1), 0);

  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
  }
}
