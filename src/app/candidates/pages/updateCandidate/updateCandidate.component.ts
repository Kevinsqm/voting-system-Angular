import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CandidateService } from '../../services/candidate.service';
import { UpdateCandidate } from '../../interfaces/candidate.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-candidate',
  imports: [ReactiveFormsModule],
  templateUrl: './updateCandidate.component.html',
  styleUrl: './updateCandidate.component.css',
})
export default class UpdateCandidateComponent {

  private fb = inject(FormBuilder);
  private candidateService = inject(CandidateService);
  id: number = inject(ActivatedRoute).snapshot.params['id'];

  updateCandidateForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    party: ['', Validators.required]
  });

  getValidationErrors(controlName: string): string {
    if (this.updateCandidateForm.controls[controlName].hasError('required') && this.updateCandidateForm.controls[controlName].touched)
      return "this field is required";
    return "";
  }

  onSubmit() {
    if (this.updateCandidateForm.invalid) {
      this.updateCandidateForm.markAllAsTouched();
      return;
    }
    const candidate: UpdateCandidate = this.updateCandidateForm.value;
    this.candidateService.update(candidate, this.id).subscribe(data => console.log("candidate updated"))
  }


}
