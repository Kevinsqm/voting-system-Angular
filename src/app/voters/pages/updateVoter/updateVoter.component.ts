import { Component, inject } from '@angular/core';
import { VoterService } from '../../services/voter.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-voter',
  imports: [ReactiveFormsModule],
  templateUrl: './updateVoter.component.html',
  styleUrl: './updateVoter.component.css',
})
export default class UpdateVoterComponent {

  private voterService = inject(VoterService);
  private fb = inject(FormBuilder);
  private id: number = inject(ActivatedRoute).snapshot.params['id'];
  private router = inject(Router);

  voterForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  getErrors(controlName: string): string {
    if (this.voterForm.controls[controlName].hasError("required") && this.voterForm.controls[controlName].touched)
      return "This field is required";
    if (this.voterForm.controls[controlName].hasError("email") && this.voterForm.controls[controlName].touched)
      return "This field must be an email";
    return "";
  }

  onSubmit() {
    if (this.voterForm.invalid) {
      this.voterForm.markAllAsTouched();
      return;
    }
    this.voterService.update(this.voterForm.value, this.id).subscribe({
      next: (data) => {
        console.log("voter updated");
        this.router.navigateByUrl("/voters");
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
