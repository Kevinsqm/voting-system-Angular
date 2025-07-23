import { Component, inject, signal } from '@angular/core';
import { VoterService } from '../../services/voter.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-all-voters',
  imports: [],
  templateUrl: './allVoters.component.html',
  styleUrl: './allVoters.component.css',
})
export default class AllVotersComponent {

  private voterService = inject(VoterService);
  private deleteTrigger = signal(0);

  resource = rxResource({
    request: this.deleteTrigger,
    loader: () => this.voterService.getAll()
  });

  deleteVoter(id: number) {
    this.voterService.delete(id).subscribe({
      next: () => {
        console.log("Voter deleted");
        this.deleteTrigger.update(value => value + 1);
      },
      error: err => console.log(err)
    })
  }

}
