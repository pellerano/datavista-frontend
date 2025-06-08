import { Component, OnInit } from '@angular/core';
import { IonContent, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonRouterOutlet, IonContent]
})
export class AuthPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
