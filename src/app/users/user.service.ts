import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly http = inject(HttpClient);
  private readonly url = "http://localhost:8080/api/v1/users";

  deleteUserByEmail(email: string) {
    return this.http.delete(`${this.url}/${email}`);
  }

}
