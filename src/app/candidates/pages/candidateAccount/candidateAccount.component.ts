import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { CandidateService } from '../../services/candidate.service';
import { UpdateCandidate } from '../../interfaces/candidate.interface';

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
  selectedFile: File | null = null;
  candidatePhoto = "";

  candidateForm = this.fb.group({
    id_card: [0],
    name: [''],
    email: [''],
    party: [''],
    photo: new FormControl<File | null>(null)
  });

  ngOnInit(): void {
    this.candidateService.getById(this.candidateId).subscribe({
      next: candidate => {
        console.log("photo: ", candidate.photoUrl);
        this.candidatePhoto = candidate.photoUrl;
        this.candidateForm.patchValue({
          id_card: candidate.id_card,
          name: candidate.name,
          email: candidate.email,
          party: candidate.party
        });
      }
    })
  }

  getErrors(controlName: string) {

  }

  onSubmit() {
    if (this.candidateForm.invalid) {
      this.candidateForm.markAllAsTouched();
      return;
    }

    const updatedCandidate: UpdateCandidate = {
      name: this.candidateForm.value.name!,
      email: this.candidateForm.value.email!,
      party: this.candidateForm.value.party!
    }

    this.candidateService.update(updatedCandidate, this.candidateId).subscribe({
      next: () => {
        console.log('Candidate updated successfully');
        this.uploadPhoto();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.candidateForm.patchValue({ photo: file });
    }

  }

  uploadPhoto() {
    if (this.candidateForm.value.photo) {
      this.candidateService.uploadPhoto(this.candidateForm.value.photo!, this.candidateId).subscribe({
        next: () => {
          console.log('Photo uploaded successfully');
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

}
