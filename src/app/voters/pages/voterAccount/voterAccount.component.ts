import { Component, inject, OnInit } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { VoterService } from '../../services/voter.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-voter-account',
  imports: [ReactiveFormsModule],
  templateUrl: './voterAccount.component.html',
  styleUrl: './voterAccount.component.css',
})
export default class VoterAccountComponent implements OnInit {

  fb = inject(FormBuilder);
  voterService = inject(VoterService);
  authService = inject(AuthService);
  voterId = this.authService.getDecodedToken()!.personalId;

  voterForm = this.fb.group({
    name: [""],
    id_card: [0],
    email: [""],
  });

  ngOnInit(): void {
    this.voterService.getById(this.voterId).subscribe({
      next: voter => {
        this.voterForm.patchValue({
          name: voter.name,
          id_card: voter.id_card,
          email: voter.email
        })
      }
    })
  }

  onSubmit() {

  }

  getErrors(controlName: string) {

  }
}
