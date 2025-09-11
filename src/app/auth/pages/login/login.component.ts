import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  hasError = signal(false);
  private readonly router = inject(Router);
  errorMessage = "";

  loginForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
  });

  getValidationErrors(controlName: string): string {
    if (this.loginForm.controls[controlName].hasError("required") && this.loginForm.controls[controlName].touched)
      return "This field is required";
    if (this.loginForm.controls[controlName].hasError("email") && this.loginForm.controls[controlName].touched)
      return "The email must be a correct format";
    if (this.loginForm.controls[controlName].hasError("minlength") && this.loginForm.controls[controlName].touched)
      return "This field must have at least " + this.loginForm.controls[controlName].errors?.["minlength"].requiredLength + " characters";
    if (this.loginForm.controls[controlName].hasError("maxlength") && this.loginForm.controls[controlName].touched)
      return "This field must have a maximum of " + this.loginForm.controls[controlName].errors?.["maxlength"].requiredLength + " characters";
    return "";
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    localStorage.removeItem("token");

    this.authService.postLogin(this.loginForm.value).subscribe({
      next: response => this.router.navigateByUrl('/home'),
      error: err => {
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
    })
  }

}
