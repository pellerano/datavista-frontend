import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-scatter-twod',
  templateUrl: './scatter-twod.component.html',
  styleUrls: ['./scatter-twod.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class ScatterTwodComponent  implements OnInit {

  constructor(
    @Inject('data') public data: any
  ) { }

  ngOnInit() {
    console.log('✅ ScatterTwodComponent inicializado', this.data);
  }

}
