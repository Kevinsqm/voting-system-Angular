import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { VoteResponse } from '../interfaces/rest-vote.interface';
import { map } from 'rxjs';
import { VoteMapper } from '../mappers/vote.mapper';
import { CreateVote } from '../interfaces/vote.interface';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private readonly url = "http://localhost:8080/api/v1/votes";
  private readonly http = inject(HttpClient);

  getAll() {
    return this.http.get<VoteResponse>(this.url)
      .pipe(
        map(vr => VoteMapper.contentArrayToVoteArray(vr.content))
      )
  }

  create(vote: CreateVote) {
    return this.http.post(this.url, vote);
  }

}
