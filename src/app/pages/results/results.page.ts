import { Component, Injector, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  IonContent, IonCard, IonCardHeader,
          IonCardTitle, IonCardContent, IonIcon,
          IonCol, IonRow, IonGrid, IonItem, IonInput,
          IonList, IonSelect, IonSelectOption, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared';
import { I18NextModule } from 'angular-i18next';
import i18next from 'i18next';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { ClassDistributionComponent } from 'src/app/shared/graphics/class-distribution/class-distribution.component';
import { TimeSeriesComponent } from 'src/app/shared/graphics/time-series/time-series.component';
import { ScatterTwodComponent } from 'src/app/shared/graphics/scatter-twod/scatter-twod.component';
import { MetricsSummaryComponent } from 'src/app/shared/graphics/metrics-summary/metrics-summary.component';
import { ElbowPlotComponent } from 'src/app/shared/graphics/elbow-plot/elbow-plot.component';
import { RocCurveComponent } from 'src/app/shared/graphics/roc-curve/roc-curve.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
  standalone: true,
  imports: [
    IonButton, 
    IonList, IonInput, IonItem, IonGrid, IonRow, IonCol,
    IonIcon, IonCardContent, IonCardTitle, IonCardHeader,
    IonCard, IonContent, IonSelect, IonSelectOption,
    CommonModule, FormsModule, HeaderComponent,
    I18NextModule, ReactiveFormsModule,
    ClassDistributionComponent,
    ScatterTwodComponent,
    TimeSeriesComponent,
    MetricsSummaryComponent,
    ElbowPlotComponent,
    RocCurveComponent
  ]
})
export class ResultsPage implements OnInit {

  form!: FormGroup;
  actions: string[] = ['Clasificación', 'Clusterización', 'Predicción'];
  graphList = [
    { id: 1, name: 'Distribución de clases', action: 'Clasificación' },
    { id: 2, name: 'ROC / Precision-Recall Curve', action: 'Clasificación' },
    { id: 3, name: 'Puntos en espacio 2D (scatter)', action: 'Clusterización' },
    { id: 4, name: 'Elbow plot (k vs inertia)', action: 'Clusterización' },
    { id: 5, name: 'Serie temporal de predicción', action: 'Predicción' },
    { id: 6, name: 'Resumen de métricas (mse, mae, etc)', action: 'Predicción' },
  ];
  graphs: {id: number, name: string}[] = [];

  componentMap: { [key: number]: any } = {
    1: ClassDistributionComponent,
    2: RocCurveComponent,
    3: ScatterTwodComponent,
    4: ElbowPlotComponent,
    5: TimeSeriesComponent,
    6: MetricsSummaryComponent,
  };

  private injectorCache: Injector | null = null;
  private lastGraphicId: number | null = null;
  selectedGraphicComponent: any = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly location: Location,
    private readonly injector: Injector,
  ) {
    addIcons({ arrowBackOutline });
    this.form = this.createForm();
  }

  ngOnInit() {
    const result = {
      name: 'Resultado 2',
      action: 'Predicción',
      date: '23/05/2025',
      data: { nombre: 'Hola prueba' }
    };
    this.form.patchValue(result);
    this.updateGraphs(result.action);
    this.setSelectedComponent(this.form.value.graphic);
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: [null],
      action: [null],
      date: [null],
      graphic: [null],
      data: [null],
    });
  }

  updateGraphs(action: string): void {
    const filtered = this.graphList
    .filter(g => g.action === action)
    .map(g => ({ id: g.id, name: g.name }));

    this.graphs = filtered;

    if (filtered.length > 0) {
      const selected = filtered[0];
      this.form.patchValue({ graphic: selected });
      this.setSelectedComponent(selected);
    }
  }

  get graphicInjector(): Injector {
    const selected = this.form.value.graphic;
    const data = this.form.value.data;

    if (!selected) return this.injector;

    if (selected.id !== this.lastGraphicId) {
      this.lastGraphicId = selected.id;
      this.injectorCache = Injector.create({
        providers: [
          { provide: 'data', useValue: { data, graphName: selected.name } }
        ],
        parent: this.injector
      });
    }

    return this.injectorCache!;
  }

  onSelectGraph(event: Event) {
    const { value } = event.target as HTMLIonSelectElement;
    this.setSelectedComponent(value);
  }

  setSelectedComponent(selected: any) {
    this.selectedGraphicComponent = selected ? this.componentMap[selected.id] : null;
  }

  goBack() {
    this.location.back();
  }

  translate(property: string): string {
    return i18next.t(`RESULTS.${property}`);
  }

}
