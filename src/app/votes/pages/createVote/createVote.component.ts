import { Component, inject, OnInit } from '@angular/core';
import { CandidateService } from '../../../candidates/services/candidate.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { VoteService } from '../../services/Vote.service';
import { CreateVote } from '../../interfaces/vote.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { SwalComponent, SwalDirective } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { VoterService } from '../../../voters/services/voter.service';
import { catchError, switchMap, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-create-vote',
  imports: [SwalDirective],
  templateUrl: './createVote.component.html',
  styleUrl: './createVote.component.css',
})
export default class CreateVoteComponent implements OnInit {

  private readonly candidateService = inject(CandidateService);
  private readonly voteService = inject(VoteService);
  private readonly authService = inject(AuthService);
  private readonly voterService = inject(VoterService);
  private voterId = this.authService.getDecodedToken()!.personalId;
  votedCandidateId = 0;

  candidatesResource = rxResource({
    loader: () => this.candidateService.getAll()
  });

  ngOnInit(): void {
    this.voteService.getByVoterId(this.voterId).subscribe({
      next: vote => {
        console.log(vote);
        this.votedCandidateId = vote.candidate.id;
      },
      error: () => console.log('No votes found')
    })
  }

  registerVote(candidateId: number) {
    const vote: CreateVote = {
      candidate_id: candidateId,
      voter_id: this.voterId
    };

    this.voterService.getById(this.voterId).pipe(
      switchMap(voter => {
        if (voter.has_voted)
          return throwError(() => new Error('Voter has already voted'));
        return this.voteService.create(vote)
      }),
      tap(() => {
        Swal.fire({
          title: "It's done!",
          text: "Your vote has been registered successfully",
          icon: "success"
        })
      }),
      catchError(err => {
        if (err.message === "Voter has already voted") {
          Swal.fire({
            title: "You cannot vote again",
            text: "Your vote was already registered",
            icon: "error"
          });
        } else {
          console.log(err);
        }
        return throwError(() => err);
      })
    ).subscribe({});
  }

}
