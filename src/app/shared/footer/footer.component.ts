import { Component, OnInit } from '@angular/core';
import { IonFooter, IonToolbar, IonText } from '@ionic/angular/standalone';
import { I18NextModule } from 'angular-i18next';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [IonText, IonFooter, IonToolbar, I18NextModule],
})
export class FooterComponent  implements OnInit {

  year: number = 0;

  constructor() { }

  ngOnInit() {
    const date = new Date();
    this.year = date.getFullYear();
  }

}
