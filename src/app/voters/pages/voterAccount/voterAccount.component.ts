import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-voter-account',
  imports: [ReactiveFormsModule],
  templateUrl: './voterAccount.component.html',
  styleUrl: './voterAccount.component.css',
})
export class VoterAccountComponent {

  fb = inject(FormBuilder);

  voterForm = this.fb.group({
    name: [''],
    email: ['']
  })

}
