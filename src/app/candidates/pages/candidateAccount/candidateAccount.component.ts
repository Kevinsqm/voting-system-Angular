import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-candidate-account',
  imports: [ReactiveFormsModule],
  templateUrl: './candidateAccount.component.html',
  styleUrl: './candidateAccount.component.css',
})
export default class CandidateAccountComponent implements OnInit {

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  candidateService = inject(CandidateService);
  candidateId = this.authService.getDecodedToken()!.personalId;

  candidateForm = this.fb.group({
    id_card: [0],
    name: [''],
    email: [''],
    party: ['']
  });

  ngOnInit(): void {
    this.candidateService.getById(this.candidateId).subscribe({
      next: candidate => {
        this.candidateForm.patchValue({
          id_card: candidate.id_card,
          name: candidate.name,
          email: candidate.email,
          party: candidate.party
        })
      }
    })
  }

  getErrors(controlName: string) {

  }

  onSubmit() {

  }

}
