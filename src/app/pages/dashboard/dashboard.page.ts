import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonButton, IonGrid, IonCol, IonRow, IonIcon } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared';
import { I18NextModule } from 'angular-i18next';
import i18next from 'i18next';
import { addIcons } from 'ionicons';
import { chevronForwardOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { UploadFileModalComponent } from './upload-file-modal/upload-file-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonIcon, IonRow, IonCol, IonGrid, IonButton, 
    IonContent, CommonModule, FormsModule, HeaderComponent,
    I18NextModule
  ],
  providers: [ ModalController ]
})
export class DashboardPage implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly modalCtrl: ModalController,
  ) {
      addIcons({ chevronForwardOutline });
  }

  ngOnInit() {
  }

  resultados = [
    { id: 1, nombre: 'Resultado 1', fecha: '23/05/2025', operacion: 'Predicción' },
    { id: 2, nombre: 'Resultado 2', fecha: '23/05/2025', operacion: 'Clasificación' },
    { id: 3, nombre: 'Resultado 3', fecha: '23/05/2025', operacion: 'Clusterización' },
    { id: 4, nombre: 'Resultado 4', fecha: '23/05/2025', operacion: 'Predicción' },
    { id: 5, nombre: 'Resultado 5', fecha: '23/05/2025', operacion: 'Clusterización' },
  ];

  seeMore() {
    this.router.navigateByUrl('/history');
  }

  seeResults(id: number) {
    this.router.navigate(['/results', id]);
  }

  async openUploadModal() {
    const modal = await this.modalCtrl.create({
      component: UploadFileModalComponent,
    });
    await modal.present();
  }

  translate(property: string): string {
    return i18next.t(`HOME.${property}`);
  }

}
