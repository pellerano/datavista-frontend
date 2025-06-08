import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-roc-curve',
  templateUrl: './roc-curve.component.html',
  styleUrls: ['./roc-curve.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class RocCurveComponent  implements OnInit {
 
  constructor(
    @Inject('data') public data: any
  ) { }

  ngOnInit() {
    console.log('✅ RocCurveComponent inicializado', this.data);
  }

}
