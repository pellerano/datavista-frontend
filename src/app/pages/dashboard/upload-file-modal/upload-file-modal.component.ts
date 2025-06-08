import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  IonContent, IonInput,
          IonButton, IonItem,
          IonIcon, IonSelect, IonSelectOption
        } from "@ionic/angular/standalone";
import { ModalController, LoadingController, ToastController } from '@ionic/angular/standalone';
import { I18NextModule } from 'angular-i18next';
import i18next from 'i18next';
import { addIcons } from 'ionicons';
import { cloudUploadOutline, cloudDoneOutline } from 'ionicons/icons';
import { UploadService } from 'src/app/core/services/upload.service';

@Component({
  selector: 'app-upload-file-modal',
  templateUrl: './upload-file-modal.component.html',
  styleUrls: ['./upload-file-modal.component.scss'],
  standalone: true,
  imports: [
    IonIcon, IonItem, 
    IonButton, IonInput,
    IonContent, IonSelect, IonSelectOption,
    ReactiveFormsModule, I18NextModule
  ],
  providers: [ ModalController, LoadingController ]
})
export class UploadFileModalComponent  implements OnInit {

  form!: FormGroup;
  actions: string[] = ['Clasificación', 'Clusterización', 'Predicción'];
  filename: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly modalCtrl: ModalController,
    private readonly toastCtrl: ToastController,
    private readonly loadingCtrl: LoadingController,
    private readonly uploadService: UploadService
  ) {
    addIcons({ cloudUploadOutline, cloudDoneOutline });
    this.form = this.createForm();
  }

  ngOnInit() {}

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      action: [null, Validators.required],
      file: [null],
      date: [new Date()]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain'
    ];

    if (file && allowedTypes.includes(file.type)) {
      this.form.patchValue({ file });
      this.filename = file.name;
    } else {
      this.form.patchValue({ file: null });
      this.toastCtrl.create({
        message: 'Archivo no válido. Usa CSV, XLS, XLSX o TXT.',
        duration: 3000,
        position: 'top'
      }).then(toast => toast.present());
    }
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    console.warn('Form', this.form.value);
    this.showLoading(this.translate('GENERATING_RESULTS'));
  }

  async showLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      message,
      cssClass: 'custom-loading',
      duration: 3000,
    });

    loading.present();
  }

  translate(property: string): string {
    return i18next.t(`HOME.MODAL_CREATE.${property}`);
  }

}
