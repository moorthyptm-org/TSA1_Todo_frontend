import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  IMessage,
  IUserReponse,
  IUserUpdateRequestPayload,
} from './users.model';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUserReponse> {
    return this.http.get<IUserReponse>(environment.host + '/users');
  }

  createUser(payload: IUserUpdateRequestPayload): Observable<IMessage> {
    return this.http.post<IMessage>(environment.host + '/users', payload);
  }

  updateUser(
    userId: number,
    payload: IUserUpdateRequestPayload
  ): Observable<unknown> {
    return this.http.put(`${environment.host}/users/${userId}`, payload);
  }

  deleteUser(userId: number): Observable<IMessage> {
    return this.http.delete<IMessage>(
      `${environment.host}/users/${userId}`,
      {}
    );
  }
}
