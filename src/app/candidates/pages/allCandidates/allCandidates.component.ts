import { Component, inject, signal } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-all-candidates',
  imports: [],
  templateUrl: './allCandidates.component.html',
  styleUrl: './allCandidates.component.css',
})
export default class AllCandidatesComponent {

  private readonly candidateService = inject(CandidateService);
  private deleteTrigger = signal(0);

  resource = rxResource({
    request: this.deleteTrigger,
    loader: () => this.candidateService.getAll()
  })

  deleteCandidate(id: number) {
    this.candidateService.delete(id).subscribe({
      next: () => {
        console.log("candidate deleted");
        this.deleteTrigger.update(value => value + 1);
      },
      error: err => console.log("error: ", err)
    });
  }

}
