import { Component, inject, OnInit } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { VoterService } from '../../services/voter.service';
import { AuthService } from '../../../auth/services/auth.service';
import { UpdateVoter } from '../../interfaces/voter.interface';

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

    if (this.voterForm.invalid) {
      this.voterForm.markAllAsTouched();
      return;
    }

    const voter: UpdateVoter = {
      email: this.voterForm.value.email!,
      name: this.voterForm.value.name!
    }

    this.voterService.update(voter, this.voterId).subscribe({
      next: () => {
        console.log("Voter updated");
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getErrors(controlName: string) {

  }
}
