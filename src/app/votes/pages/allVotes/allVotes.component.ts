import { Component, inject } from '@angular/core';
import { VoteService } from '../../services/Vote.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-all-votes',
  imports: [],
  templateUrl: './allVotes.component.html',
  styleUrl: './allVotes.component.css',
})
export default class AllVotesComponent {

  private readonly voteService = inject(VoteService);

  resource = rxResource({
    loader: () => this.voteService.getAll()
  });


}
