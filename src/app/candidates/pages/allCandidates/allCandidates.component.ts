import { Component, computed, effect, inject, signal } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../../users/user.service';

type Trigger = {
  delete: number;
  query: string;
}

@Component({
  selector: 'app-all-candidates',
  imports: [],
  templateUrl: './allCandidates.component.html',
  styleUrl: './allCandidates.component.css',
})
export default class AllCandidatesComponent {

  private readonly candidateService = inject(CandidateService);
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  userType = this.authService.getRole();
  searchInput = signal("");
  deleteCount = signal(0);

  searchInputAux = signal("");

  debounceEffect = effect((onCleanup) => {
    const value = this.searchInput();
    const timeout = setTimeout(() => {
      this.searchInputAux.set(value);
    }, 1500);
    onCleanup(() => clearTimeout(timeout));
  })

  request = computed<Trigger>(() => {
    return { delete: this.deleteCount(), query: this.searchInputAux() }
  })

  resource = rxResource({
    request: this.request,
    loader: () => {
      if (this.request().query == "")
        return this.candidateService.getAll()
      else
        return this.candidateService.getByName(this.request().query);
    }
  })

  deleteCandidate(id: number, email: string) {
    this.candidateService.delete(id).subscribe({
      next: () => {
        console.log("candidate deleted");
        this.userService.deleteUserByEmail(email).subscribe({
          next: () => {
            console.log("user deleted");
            this.deleteCount.update(value => value + 1);
          },
          error: err => console.log("error: ", err)
        })
      },
      error: err => console.log("error: ", err)
    });
  }


}
