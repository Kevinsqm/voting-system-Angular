import { Component, inject } from '@angular/core';
import { CandidateService } from '../../../candidates/services/candidate.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { VoteService } from '../../services/Vote.service';
import { CreateVote } from '../../interfaces/vote.interface';

@Component({
  selector: 'app-create-vote',
  imports: [],
  templateUrl: './createVote.component.html',
  styleUrl: './createVote.component.css',
})
export default class CreateVoteComponent {

  private readonly candidateService = inject(CandidateService);
  private readonly voteService = inject(VoteService);

  resource = rxResource({
    loader: () => this.candidateService.getAll()
  });

  registerVote(candidateId: number) {
    const vote: CreateVote = {
      candidate_id: candidateId,
      voter_id: 0
    };

    this.voteService.create(vote).subscribe({
      next: () => console.log("vote registered"),
      error: (err) => console.log(err)
    })
  }

}
