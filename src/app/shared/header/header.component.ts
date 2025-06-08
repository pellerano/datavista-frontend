import { Component, Input, OnInit } from '@angular/core';
import {
  IonHeader, IonTitle,
  IonMenuButton, IonToolbar, IonButtons,
  IonImg, IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonHeader, IonTitle, IonToolbar,
    IonMenuButton, IonImg,
    IonCol, IonGrid, IonRow
  ]
})
export class HeaderComponent  implements OnInit {

  @Input() title: string = '';

  constructor() { }

  ngOnInit() {}

}
