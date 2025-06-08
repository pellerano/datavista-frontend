import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-time-series',
  templateUrl: './time-series.component.html',
  styleUrls: ['./time-series.component.scss'],
  standalone: true,
  imports: [
    CommonModule, BaseChartDirective
  ]
})
export class TimeSeriesComponent  implements OnInit {
 
  constructor(
    @Inject('data') public data: any
  ) { }

  ngOnInit() {
    console.log('✅ TimeSeriesComponent inicializado', this.data);
  }

  // Horizon de predicción: por ejemplo, 10 pasos
  predictionHorizon = Array.from({ length: 10 }, (_, i) => `t+${i + 1}`);

  // Valores de predicción (simulados)
  predictedValues = [10, 20, 30, 50, 80, 100, 21, 40, 10, 70];

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.predictionHorizon,
    datasets: [
      {
        data: this.predictedValues,
        label: 'Predicción',
        fill: false,
        tension: 0.1,
        borderColor: '#3880ff',
        backgroundColor: '#3880ff',
        // pointRadius: 5,
        // pointHoverRadius: 7
      }
    ]
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      },
      title: {
        display: true,
        text: 'Predicción de valores futuros'
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Pasos en el tiempo'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Valor predicho'
        },
        beginAtZero: true
      }
    }
  };

}
