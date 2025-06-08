import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-metrics-summary',
  templateUrl: './metrics-summary.component.html',
  styleUrls: ['./metrics-summary.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class MetricsSummaryComponent  implements OnInit {
 
  constructor(
    @Inject('data') public data: any
  ) { }

  ngOnInit() {
    console.log('✅ MetricsSummaryComponent inicializado', this.data);
  }

}
