import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonCol, IonRow, IonIcon, IonButton, IonPopover, IonLabel, IonItem, IonList } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared';
import i18next from 'i18next';
import { I18NextModule } from 'angular-i18next';
import { addIcons } from 'ionicons';
import { ellipsisVertical } from 'ionicons/icons';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel, IonPopover, 
    IonButton, IonIcon, IonRow,
    IonCol, IonGrid, IonContent,
    CommonModule, FormsModule, HeaderComponent,
    I18NextModule
  ],
  providers: [AlertController, ToastController]
})
export class HistoryPage implements OnInit {

  resultados = [
    { id: 1, nombre: 'Resultado 1', fecha: '23/05/2025', operacion: 'Predicción' },
    { id: 2, nombre: 'Resultado 2', fecha: '23/05/2025', operacion: 'Clasificación' },
    { id: 3, nombre: 'Resultado 3', fecha: '23/05/2025', operacion: 'Clusterización' },
    { id: 4, nombre: 'Resultado 4', fecha: '23/05/2025', operacion: 'Predicción' },
    { id: 5, nombre: 'Resultado 5', fecha: '23/05/2025', operacion: 'Clusterización' },
  ];

  constructor(
    private readonly router: Router,
    private readonly alertCtrl: AlertController,
    private readonly toastCtrl: ToastController,
  ) { 
    addIcons({ ellipsisVertical });
  }

  ngOnInit() {
  }

  popoverEvent: Event | null = null;
  activePopoverId: number | null = null;

  presentPopover(ev: Event, item: any) {
    this.popoverEvent = ev;
    this.activePopoverId = item.id;
  }

  onView(id: number) {
    this.activePopoverId = null;
    this.router.navigate(['/results', id]);
  }

  async onDeleteConfirm(item: any) {
    this.activePopoverId = null;
    const alert = await this.alertCtrl.create({
      header: this.translate('DELETE'),
      message: this.translate('ARE_YOU_SURE_TO_DELETE'),
      buttons: [
        {
          text: this.translate('NO'),
          role: 'cancel'
        },
        {
          text: this.translate('YES'),
          handler: () => this.deleteItem(item.id)
        }
      ]
    });

    await alert.present();
  }

  async deleteItem(id: number) {
    try {
      // Simula servicio: await this.miServicio.eliminar(id);
      this.resultados = this.resultados.filter(r => r.id !== id);

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

  translate(property: string): string {
    return i18next.t(`HISTORICAL.${property}`);
  }

}
