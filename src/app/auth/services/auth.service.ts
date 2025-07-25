import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login, Register, Token, UserInfo } from '../interfaces/auth.interface';
import { catchError, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode'

export type Status = "Authenticated" | "Unauthenticated";

export interface JwtPayload {
  sub: string;
  roles: string;
  id: number;
  personalId: number;
  name: string;
  iat: number;
  exp: number;
}

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
    return this.http.post<Token>(`${this.url}/login`, login)
      .pipe(
        tap(token => {
          localStorage.setItem("token", token.token);
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
  }

  getRole() {
    const user = this.getDecodedToken();
    return user?.roles.slice(5);
  }

  getDecodedToken(): JwtPayload | null {
    const token = localStorage.getItem("token");
    if (!token)
      return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch (err) {
      console.error("invalid token: ", err);
      return null;
    }
  }

}
