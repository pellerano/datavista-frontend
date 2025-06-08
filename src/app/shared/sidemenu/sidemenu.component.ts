import { Component, Inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonMenu, IonContent, IonIcon,
  IonHeader,IonTitle, IonToolbar,
  IonMenuToggle, IonItem, 
  IonLabel, IonList, IonButton, IonFooter } from '@ionic/angular/standalone';
import { I18NEXT_SERVICE, I18NextModule, ITranslationService } from 'angular-i18next';
import i18next from 'i18next';
import { addIcons } from 'ionicons';
import { homeOutline, logOutOutline, arrowBackOutline, settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  standalone: true,
  imports: [IonFooter, 
    IonButton, IonList, IonLabel,
    IonItem, IonMenuToggle,
    IonIcon, IonContent, IonMenu,
    IonHeader, IonTitle, IonToolbar,
    RouterModule, I18NextModule
  ]
})
export class SidemenuComponent  implements OnInit {

  language: string = 'es';
  languages: string[] = ['es', 'en'];
  
  constructor() {
    addIcons({ homeOutline, logOutOutline, arrowBackOutline, settingsOutline });
  }

  ngOnInit(): void {
  }

  translate(property: string): string {
    return i18next.t(`SIDEMENU.${property}`);
  }
  
  logout() {
    console.log('Sesión cerrada');
  }
}
