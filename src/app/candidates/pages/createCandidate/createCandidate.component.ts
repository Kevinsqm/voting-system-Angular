import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CandidateService } from '../../services/candidate.service';
import { CreateCandidate } from '../../interfaces/candidate.interface';

@Component({
  selector: 'app-create-candidate',
  imports: [ReactiveFormsModule],
  templateUrl: './createCandidate.component.html',
  styleUrl: './createCandidate.component.css',
})
export default class CreateCandidateComponent {

  private fb = inject(FormBuilder);
  private candidateService = inject(CandidateService);

  candidateForm: FormGroup = this.fb.group({
    id_card: [0, [Validators.required, Validators.min(10000)]],
    name: ["", Validators.required],
    party: ["", Validators.required]
  });

  getErrors(controlName: string) {
    if (this.candidateForm.controls[controlName].hasError("required") && this.candidateForm.controls[controlName].touched)
      return "This field is required";
    if (this.candidateForm.controls[controlName].hasError("min") && this.candidateForm.controls[controlName].touched)
      return "This field must be at least 5 digits"
    return "";
  }

  onSubmit() {
    if (this.candidateForm.invalid) {
      this.candidateForm.markAllAsTouched;
      return;
    }
    const candidate: CreateCandidate = this.candidateForm.value;
    this.candidateService.create(candidate).subscribe(data => console.log("candidate created"));
  }

}
