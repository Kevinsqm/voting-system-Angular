import { Component, inject, signal } from '@angular/core';
import { VoteService } from '../../services/Vote.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})
export default class ResultsComponent {

  private readonly voteService = inject(VoteService);

  voteResource = rxResource({
    loader: () => this.voteService.getStatistics()
  });

}
