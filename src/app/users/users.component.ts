import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Users } from './users.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  roles: string[] = ['ADMIN', 'USER'];

  isEdit = false;

  edituserId: number;
  progress: boolean = false;

  userList: Users[];

  userForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    role: new FormControl(null, Validators.required),
  });

  constructor(
    private snackBar: MatSnackBar,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.userList = res.data;
      },
      error: (error) => {
        this.snackBar.open(error.error.message, '', { duration: 2000 });
      },
    });
  }

  onSubmit(): void {
    this.progress = true;
    if (this.isEdit) {
      this.onEdit();
    } else {
      this.userService.createUser(this.userForm.value).subscribe({
        next: (d) => {
          this.snackBar.open(d.message, '', { duration: 2000 });
          this.getUsers();
        },
        error: (error) =>
          this.snackBar.open(error.error.message, '', { duration: 2000 }),
      });
    }
  }

  onEdit(): void {
    this.userService
      .updateUser(this.edituserId, this.userForm.value)
      .subscribe({
        next: (d) => {
          this.getUsers();
          this.edituserId = null;
          this.isEdit = false;
        },
        error: (error) =>
          this.snackBar.open(error.error.message, '', { duration: 2000 }),
      });
  }

  doEdit(payload: Users): void {
    this.isEdit = true;
    this.edituserId = payload.id;

    const { username, role } = payload;
    this.userForm.setValue({
      username,
      password: null,
      role,
    });
  }

  doDelete(userId: number, index: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: (d) => {
        this.snackBar.open(d['message'], '', { duration: 2000 });
        this.userList.splice(index, 1);
      },
      error: (error) =>
        this.snackBar.open(error.error.message, '', { duration: 2000 }),
    });
  }
}
