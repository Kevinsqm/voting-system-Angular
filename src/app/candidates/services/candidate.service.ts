import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CandidatesResponse } from '../interfaces/rest-candidates.interface';
import { Candidate, CreateCandidate, UpdateCandidate } from '../interfaces/candidate.interface';
import { CandidateMapper } from '../mappers/candidate.mapper';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private http = inject(HttpClient);
  private url = "http://localhost:8080/api/v1/candidates";

  getAll(): Observable<Candidate[]> {
    return this.http.get<CandidatesResponse>(this.url)
      .pipe(
        map(cr => CandidateMapper.toCandidatesArray(cr.content))
      )
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

}
