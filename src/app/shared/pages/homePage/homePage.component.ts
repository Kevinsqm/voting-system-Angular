import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { CandidateHomeComponent } from '../../../candidates/components/candidateHome/candidateHome.component';
import { VoterHomeComponent } from '../../../voters/components/voterHome/voterHome.component';

@Component({
  selector: 'app-home-page',
  imports: [CandidateHomeComponent, VoterHomeComponent],
  templateUrl: './homePage.component.html',
  styleUrl: './homePage.component.css',
})
export class HomePageComponent {

  authService = inject(AuthService);
  userName = this.authService.getDecodedToken()?.name;
  userType = this.authService.getRole();


}
