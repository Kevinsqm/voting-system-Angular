import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { Register } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export default class RegisterComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  registerForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    role_id: [0, [Validators.required]]
  })

  getValidationErrors(field: string): string {
    if (this.registerForm.controls[field].hasError("required")) {
      return "Este campo es requerido";
    }
    if (this.registerForm.controls[field].hasError("minlength")) {
      return "Este campo debe tener al menos " + this.registerForm.controls[field].errors?.["minlength"].requiredLength + " caracteres";
    }
    if (this.registerForm.controls[field].hasError("maxlength")) {
      return "Este campo debe tener máximo " + this.registerForm.controls[field].errors?.["maxlength"].requiredLength + " caracteres";
    }
    return ""
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    // console.log(this.registerForm.value);
    let register: Register = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      role_id: parseInt(this.registerForm.value.role_id)
    }

    this.authService.postRegister(register).subscribe(resp => console.log("registro enviado"));
  }
}
