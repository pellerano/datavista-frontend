import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonButton, IonItem, IonInput, IonText, IonImg, IonCard, IonCol, IonRow, IonGrid } from '@ionic/angular/standalone';
import i18next from 'i18next';
import { RouterModule } from '@angular/router';
import { matchPasswordValidator } from 'src/app/utils';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, 
    IonCard, IonImg, IonText, IonItem, IonButton, 
    IonContent, FormsModule, ReactiveFormsModule,
    RouterModule, IonInput
  ]
})
export class SignupPage {
  signUpForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.signUpForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group(
      {
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: matchPasswordValidator('password', 'confirmPassword'),
      }
    );
  }

  get formControls() {
    return this.signUpForm.controls;
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      const data = this.signUpForm.value;
      console.log('Sign Up', data);
    }
  }

  translate(property: string): string {
    return i18next.t(`SIGNUP.${property}`);
  }

}
