import { Component, inject, OnInit } from '@angular/core';
import { VoterService } from '../../services/voter.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateVoter } from '../../interfaces/voter.interface';

@Component({
  selector: 'app-create-voter',
  imports: [ReactiveFormsModule],
  templateUrl: './createVoter.component.html',
  styleUrl: './createVoter.component.css',
})
export default class CreateVoterComponent {

  private voterService = inject(VoterService);
  private fb = inject(FormBuilder)

  voterForm: FormGroup = this.fb.group({
    id_card: [0, [Validators.required, Validators.min(10000)]],
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
  });

  getErrors(controlName: string): string {
    if (this.voterForm.controls[controlName].hasError("required") && this.voterForm.controls[controlName].touched)
      return "This field is required";
    if (this.voterForm.controls[controlName].hasError("min") && this.voterForm.controls[controlName].touched)
      return "This field must be at least 5 digits";
    if (this.voterForm.controls[controlName].hasError("email") && this.voterForm.controls[controlName].touched)
      return "This field must have a valid email";

    return "";
  }

  onSubmit() {
    if (this.voterForm.invalid) {
      this.voterForm.markAllAsTouched();
      return;
    }

    this.voterService.create(this.voterForm.value).subscribe({
      next: data => console.log("voter created"),
      error: err => console.log(err)
    });
  }
}
