import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login, Register, UserInfo } from '../interfaces/auth.interface';
import { catchError, tap } from 'rxjs';

export type Status = "Authenticated" | "Unauthenticated"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private url = "http://localhost:8080/api/v1/users";
  // user: UserInfo | null = null;

  postRegister(register: Register) {
    return this.http.post(`${this.url}/register`, register);
  }

  postLogin(login: Login) {
    return this.http.post<UserInfo>(`${this.url}/login`, login)
      .pipe(
        tap(resp => {
          // this.user = resp;
          localStorage.setItem("token", resp.token);
          localStorage.setItem("user", JSON.stringify(resp));
        }),
        catchError(err => { throw err; })
      );
  }

  verifyStatus(): Status {
    const token = localStorage.getItem("token");
    return token ? "Authenticated" : "Unauthenticated";
  }

  getUserInfo() {
    const user: UserInfo = JSON.parse(localStorage.getItem("user") || "{}");
    return user;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  getRole() {
    const user = this.getUserInfo();
    return user.roles[0].slice(5);
  }

}
