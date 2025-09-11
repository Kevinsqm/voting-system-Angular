import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ExistsByIdCardResponse, VoterResponse, VotersResponse } from '../interfaces/rest-voters.interface';
import { catchError, map, tap } from 'rxjs';
import { VoterMapper } from '../mappers/voter.mapper';
import { CreateVoter, UpdateVoter } from '../interfaces/voter.interface';

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  private url = "http://localhost:8080/api/v1/voters";
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<VotersResponse>(this.url)
      .pipe(
        map(vr => VoterMapper.contentArrayToVoterArray(vr.content))
      );
  }

  getById(id: number) {
    return this.http.get<VoterResponse>(`${this.url}/${id}`)
      .pipe(
        tap(res => console.log(res)),
        catchError(err => { throw err })
      );
  }

  checkIfIdCardExists(idCard: number) {
    return this.http.get<ExistsByIdCardResponse>(`${this.url}/idCard/${idCard}`)
      .pipe(
        map(res => res.exists)
      );
  }

  create(voter: CreateVoter) {
    return this.http.post(this.url, voter);
  }

  update(voter: UpdateVoter, id: number) {
    return this.http.put(`${this.url}/${id}`, voter)
      .pipe(
        catchError(err => { throw err })
      );
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
