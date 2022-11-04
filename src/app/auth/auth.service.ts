import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

import jwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {
  private _userAuthendicated: boolean = false;

  get isUserAuthendicated() {
    return this._userAuthendicated;
  }

  private _token: string | null = null;

  get token() {
    return this._token;
  }

  userInfo: { username: string | null; role: string | null } = {
    username: null,
    role: null,
  };

  constructor(private http: HttpClient) {}

  login(loginCredentials: {
    username: string;
    password: string;
  }): Observable<HttpResponse<unknown>> {
    return this.http
      .post(environment.host + '/login', loginCredentials, {
        observe: 'response',
      })
      .pipe(
        tap((d) => {
          if (d.status === 200) {
            this._userAuthendicated = true;
            this._token = d.headers.get('Authorization');

            const jwt = this.token.split('Bearer')[1];

            const decodeData: { role: string; username: string } =
              jwtDecode(jwt);

            this.userInfo.role = decodeData.role;
            this.userInfo.username = decodeData.username;
          }
        })
      );
  }

  logout() {
    this._token = null;
    this._userAuthendicated = false;
    this.userInfo = {
      role: null,
      username: null,
    };
  }
}
