import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CandidatesResponse, ExistsByIdCardResponse } from '../interfaces/rest-candidates.interface';
import { Candidate, CreateCandidate, UpdateCandidate } from '../interfaces/candidate.interface';
import { CandidateMapper } from '../mappers/candidate.mapper';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private http = inject(HttpClient);
  private url = "http://localhost:8080/api/v1/candidates";

  private getByNameCache = new Map<string, Candidate[]>();

  getAll(name?: string): Observable<Candidate[]> {
    if (name && name !== '') {
      if (this.getByNameCache.has(name))
        return of(this.getByNameCache.get(name)!)
      return this.http.get<CandidatesResponse>(`${this.url}?name=${name}`)
        .pipe(
          map(cr => CandidateMapper.toCandidatesArray(cr.content)),
          tap(res => this.getByNameCache.set(name, res)),
          catchError(err => { throw err })
        );
    }
    return this.http.get<CandidatesResponse>(this.url)
      .pipe(
        map(cr => CandidateMapper.toCandidatesArray(cr.content))
      )
  }

  getById(id: number) {
    return this.http.get<Candidate>(`${this.url}/${id}`);
  }

  checkIfIdCardExists(idCard: number) {
    return this.http.get<ExistsByIdCardResponse>(`${this.url}/idCard/${idCard}`)
      .pipe(
        map(res => res.exists)
      );
  }

  create(candidate: CreateCandidate) {
    return this.http.post(this.url, candidate);
  }

  update(candidate: UpdateCandidate, id: number) {
    return this.http.put(`${this.url}/${id}`, candidate);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  uploadPhoto(file: File, candidateId: number) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.put(`${this.url}/${candidateId}/update-photo`, formData)
      .pipe(
        catchError(err => { throw err })
      );
  }

  getByName(name: string) {
    if (this.getByNameCache.has(name)) {
      return of(this.getByNameCache.get(name)!)
    }
    return this.http.get<Candidate[]>(`${this.url}/by-name?name=${name}`)
      .pipe(
        tap(res => this.getByNameCache.set(name, res)),
        catchError(err => { throw err })
      );
  }

}
