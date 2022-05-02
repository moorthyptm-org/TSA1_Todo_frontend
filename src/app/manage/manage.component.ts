import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { TodoService } from '../todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoList } from '../todo.model';
import { Store } from '@ngrx/store';
import { ITodoListModel } from '../store/todo.reducer';
import { Observable, Subscription } from 'rxjs';
import {
  AddTodo,
  EditTodo,
  DeleteTodo,
  StartEditTodo,
  IToDo,
  FetchTodo,
} from '../store/todo.actions';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit, OnDestroy {
  isEdit = false;
  todoId: number = null;
  todoList$: Observable<ITodoListModel>;
  listSubscription: Subscription;

  todoForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    comment: new FormControl(null, Validators.required),
  });

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  get username() {
    return this.authService.userInfo.username;
  }

  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private store: Store<{ TodoList: ITodoListModel }>
  ) {}

  ngOnInit(): void {
    this.todoList$ = this.store.select('TodoList');
    this.store.dispatch(new FetchTodo());

    this.listSubscription = this.store.select('TodoList').subscribe((data) => {
      if (data.editState) {
        const { title, comment, id } = data.data[data.editIndex];
        this.todoId = id;
        this.onEdit({ title, comment });
      }
    });
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const { title, comment } = this.todoForm.value;
      if (this.isEdit) {
        this.store.dispatch(new EditTodo(this.todoId, { title, comment }));
      } else {
        this.store.dispatch(new AddTodo({ title, comment }));
      }
      this.snackBar.open(
        `${this.isEdit ? 'Edited' : 'Added'} successfully`,
        '',
        { duration: 2000 }
      );
      this.isEdit = false;
      // this.editIndex = null;
      this.todoForm.reset();
      this.formDirective.resetForm();
    }
  }

  onEdit(payload: IToDo): void {
    this.isEdit = true;
    const { title, comment } = payload;
    this.todoForm.setValue({
      title,
      comment,
    });
  }

  doEdit(index: number): void {
    this.store.dispatch(new StartEditTodo(index));
  }

  doDelete(todoId: number, index: number): void {
    this.store.dispatch(new DeleteTodo(todoId, index));
    this.snackBar.open(`Deleted successfully`, '', { duration: 2000 });
  }

  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
  }
}
