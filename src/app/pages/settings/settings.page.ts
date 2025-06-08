import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonButton, IonCol, IonSelect, IonSelectOption, IonRow, IonIcon, IonGrid, IonModal, IonItem, IonToolbar, IonHeader, IonTitle, IonList, IonInput, IonCardHeader, IonCardTitle, IonCardContent, IonCard, IonText } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared';
import i18next from 'i18next';
import { I18NEXT_SERVICE, I18NextModule, ITranslationService } from 'angular-i18next';
import { addIcons } from 'ionicons';
import { trashOutline, languageOutline, personCircleOutline } from 'ionicons/icons';
import { AlertController, ToastController } from '@ionic/angular/standalone';
import { matchPasswordValidator } from 'src/app/utils';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonText, 
    IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonInput, IonList, 
    IonTitle, IonHeader, IonToolbar, IonItem, IonModal, 
    IonGrid, IonIcon, IonRow, IonCol, IonSelect, IonSelectOption,
    IonButton, IonContent, CommonModule, FormsModule, HeaderComponent,
    I18NextModule, ReactiveFormsModule
  ]
})
export class SettingsPage implements OnInit {

  language: string = 'es';
  languages: string[] = ['es', 'en'];
  openChangeLanguageModal = false;
  isOpenEditProfileModal = false;
  userForm!: FormGroup;

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextSvc: ITranslationService,
    private readonly alertCtrl: AlertController,
    private readonly toastCtrl: ToastController,
    private readonly fb: FormBuilder,
  ) {
    addIcons({ trashOutline, languageOutline, personCircleOutline });
    this.userForm = this.createForm();
  }

  ngOnInit(): void {
    this.i18NextSvc.events.initialized.subscribe(e => {
      if (e) {
        this.updateState(this.i18NextSvc.language);
      }
    });
    this.userForm.patchValue({...this.user});
  }

  createForm(): FormGroup {
    return this.fb.group(
      {
        id: ['', Validators.required],
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
    return this.userForm.controls;
  }

  onCancelEdit():void {
    this.isOpenEditProfileModal = false;
  }

  onSubmit() {
    if (this.userForm.valid) {
      const data = this.userForm.value;
      this.isOpenEditProfileModal = false;
      console.log('Profile', data);
    }
  }

  openModal(isOpen: boolean): void {
    this.openChangeLanguageModal = isOpen;
  }

  openEditProfileModal(isOpen: boolean): void {
    this.isOpenEditProfileModal = isOpen;
  }

  changeLanguage(event: Event) {
    const { value } = event.target as HTMLIonSelectElement;
    this.openChangeLanguageModal = false;
    if (value !== this.i18NextSvc.language) {
      this.i18NextSvc.changeLanguage(value).then(x => {
        this.updateState(value);
        location.reload();
      })
    }
  }

  private updateState(lang: string) {
    this.language = lang
  }

  async onDeleteConfirm() {
    const alert = await this.alertCtrl.create({
      header: this.translate('ARE_YOU_SURE_TO_DELETE'),
      message: this.translate('DELETE_ADVICE'),
      buttons: [
        {
          text: this.translate('NO'),
          role: 'cancel'
        },
        {
          text: this.translate('YES'),
          handler: () => this.deleteItem(this.user.id)
        }
      ]
    });

    await alert.present();
  }

  async deleteItem(id: number) {
    try {
      /**
       * *LLAMADA AL BACKEND PARA ELIMINAR LA CUENTA
       * *SI TODO SATISTACTORIO, CERRAR LA SESION
       */

      const toast = await this.toastCtrl.create({
        message: this.translate('DELETED_SUCCESS'),
        duration: 2000,
        position: 'bottom',
        color: 'success'
      });
      toast.present();
    } catch {
      const toast = await this.toastCtrl.create({
        message: this.translate('DELETED_ERROR'),
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
    }
  }

  user = {
    id: 1,
    name: 'Nombre usuario',
    lastname: 'Apellido usuario',
    email: 'usuario@uah.edu.es',
    rol: 'user',
    password: 'tupassword',
    confirmPassword: 'tupassword',
  }

  translate(property: string): string {
    return i18next.t(`SETTINGS.${property}`);
  }

}
