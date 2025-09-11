import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { Register } from '../../interfaces/auth.interface';
import { CreateVoter } from '../../../voters/interfaces/voter.interface';
import { VoterService } from '../../../voters/services/voter.service';
import { CreateCandidate } from '../../../candidates/interfaces/candidate.interface';
import { CandidateService } from '../../../candidates/services/candidate.service';
import { Router, RouterLink } from '@angular/router';
import { catchError, map, Observable, of, switchMap, tap, timer } from 'rxjs';

const asyncVoterIdCardValidator = (voterService: VoterService): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const idCardValue: number = control.value;
    return timer(1500).pipe(
      switchMap(() =>
        voterService.checkIfIdCardExists(idCardValue)
          .pipe(
            map(res => res ? { invalidIdCard: true } : null),
            tap(res => console.log("llamada http de validacion")),
            catchError(() => of(null))
          )
      )
    )
  }
}

const asyncCandidateIdCardValidator = (candidateService: CandidateService): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const idCardValue: number = control.value;
    return timer(1500).pipe(
      switchMap(() =>
        candidateService.checkIfIdCardExists(idCardValue)
          .pipe(
            map(res => res ? { invalidIdCard: true } : null),
            tap(res => console.log("llamada http de validacion")),
            catchError(() => of(null))
          )
      )
    )
  }
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export default class RegisterComponent implements OnInit {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private voterService = inject(VoterService);
  private candidateService = inject(CandidateService);
  private router = inject(Router);
  hasError = signal(false);
  errorMessage = "";

  voterRegisterForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    id_card: [0, [Validators.required, Validators.min(10000)], [asyncVoterIdCardValidator(this.voterService)]],
    name: ["", [Validators.required, Validators.minLength(4)]],
  });

  candidateRegisterForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    id_card: [0, [Validators.required, Validators.min(10000)], [asyncCandidateIdCardValidator(this.candidateService)]],
    name: ["", [Validators.required, Validators.minLength(4)]],
    party: ["", [Validators.required, Validators.minLength(4)]]
  });

  ngOnInit(): void {
    localStorage.removeItem("token");
  }

  getValidationErrorsVoter(field: string): string {
    const control = this.voterRegisterForm.controls[field];
    if (control.hasError("required") && control.touched) {
      return "Este campo es requerido";
    }
    if (control.hasError("minlength") && control.touched) {
      return "Este campo debe tener al menos " + control.errors?.["minlength"].requiredLength + " caracteres";
    }
    if (control.hasError("maxlength") && control.touched) {
      return "Este campo debe tener máximo " + control.errors?.["maxlength"].requiredLength + " caracteres";
    }
    if (control.hasError("min") && control.touched) {
      return "This field must have at least 5 digits";
    }
    if (control.hasError("email") && control.touched) {
      return "This field must be a valid email";
    }
    if (control.hasError("invalidIdCard") && control.touched) {
      return "There is already a voter with this id card";
    }
    return ""
  }

  getValidationErrorsCandidate(field: string): string {
    const control = this.candidateRegisterForm.controls[field];
    if (control.hasError("required") && control.touched) {
      return "Este campo es requerido";
    }
    if (control.hasError("minlength") && control.touched) {
      return "Este campo debe tener al menos " + control.errors?.["minlength"].requiredLength + " caracteres";
    }
    if (control.hasError("maxlength") && control.touched) {
      return "Este campo debe tener máximo " + control.errors?.["maxlength"].requiredLength + " caracteres";
    }
    if (control.hasError("min") && control.touched) {
      return "This field must have at least 5 digits";
    }
    if (control.hasError("email") && control.touched) {
      return "This field must be a valid email";
    }
    if (control.hasError("invalidIdCard") && control.touched) {
      return "There is already a candidate with this id card";
    }
    return ""
  }

  onSubmitVoter() {
    if (this.voterRegisterForm.invalid) {
      this.voterRegisterForm.markAllAsTouched();
      return;
    }
    // console.log(this.registerForm.value);
    let register: Register = {
      email: this.voterRegisterForm.value.email,
      password: this.voterRegisterForm.value.password,
      role_id: 2
    }

    let voter: CreateVoter = {
      email: this.voterRegisterForm.value.email,
      name: this.voterRegisterForm.value.name,
      id_card: this.voterRegisterForm.value.id_card
    }

    this.authService.postRegister(register).subscribe({
      next: resp1 => {
        this.voterService.create(voter).subscribe({
          next: resp2 => this.router.navigateByUrl('/auth/login'),
          error: err => {
            this.showError(err);
          }
        });
      },
      error: err => {
        this.showError(err);
      }
    })
  }

  onSubmitCandidate() {
    if (this.candidateRegisterForm.invalid) {
      this.candidateRegisterForm.markAllAsTouched();
      return;
    }

    let register: Register = {
      email: this.candidateRegisterForm.value.email,
      password: this.candidateRegisterForm.value.password,
      role_id: 3
    };

    let candidate: CreateCandidate = {
      email: this.candidateRegisterForm.value.email,
      id_card: this.candidateRegisterForm.value.id_card,
      name: this.candidateRegisterForm.value.name,
      party: this.candidateRegisterForm.value.party
    };

    this.authService.postRegister(register).subscribe({
      next: resp => {
        this.candidateService.create(candidate).subscribe({
          next: resp2 => this.router.navigateByUrl('/auth/login'),
          error: err => {
            this.showError(err);
          }
        });
      },
      error: err => {
        this.showError(err);
      }
    });
  }

  private showError(err: any) {
    this.errorMessage = err.error.detail;
    this.hasError.set(true);
    setTimeout(() => {
      document.getElementById("myAlert")?.classList.remove("fadeIn");
      document.getElementById("myAlert")?.classList.add("fadeOut");
      document.getElementById("myAlert")?.addEventListener("animationend", (e) => {
        if (e.animationName === "fadeOut") {
          this.hasError.set(false);
        }
      })

    }, 3500);
    console.log(err);
  }


}
