import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IsTokenValid, Login, Register, Token, UserInfo } from '../interfaces/auth.interface';
import { catchError, map, Observable, tap } from 'rxjs';
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

  isTokenValid() {
    return this.http.get<IsTokenValid>(`${this.url}/is-token-valid`, {
      headers: {
        "Token": localStorage.getItem("token") || ""
      }
    }).pipe(
      map(res => res.valid),
      tap(res => console.log(res))
    );
  }

  verifyStatus(): Observable<Status> {
    return this.isTokenValid().pipe(
      map(res => {
        const payload = this.getDecodedToken();
        return payload && res === true ? "Authenticated" : "Unauthenticated"
      })
    );
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
