import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {  IonButton, IonInput, IonText,
          IonItem, IonContent, IonCard, IonImg } from '@ionic/angular/standalone';
import { I18NextModule } from 'angular-i18next';
import i18next from 'i18next';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonButton, IonInput, IonText,
    IonItem, IonContent, IonCard, ReactiveFormsModule,
    I18NextModule, IonImg, RouterModule
  ],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Logging in with', email, password);
    }
  }

  translate(property: string): string {
    return i18next.t(`LOGIN.${property}`);
  }
}
