import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-distribution',
  templateUrl: './class-distribution.component.html',
  styleUrls: ['./class-distribution.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class ClassDistributionComponent  implements OnInit {

  constructor(
    @Inject('data') public data: any
  ) { }

  ngOnInit() {
    console.log('✅ ClassDistributionComponent inicializado', this.data);
  }

}
