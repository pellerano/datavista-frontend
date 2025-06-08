import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-elbow-plot',
  templateUrl: './elbow-plot.component.html',
  styleUrls: ['./elbow-plot.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class ElbowPlotComponent  implements OnInit {
 
  constructor(
    @Inject('data') public data: any
  ) { }

  ngOnInit() {
    console.log('✅ ElbowPlotComponent inicializado', this.data);
  }

}
