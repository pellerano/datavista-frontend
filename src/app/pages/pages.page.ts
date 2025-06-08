import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonRouterOutlet, IonContent } from '@ionic/angular/standalone';
import { SidemenuComponent, FooterComponent } from '../shared';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonRouterOutlet, CommonModule,
    SidemenuComponent, FooterComponent
  ]
})
export class PagesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
