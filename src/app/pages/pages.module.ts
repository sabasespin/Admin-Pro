import { GraficoDonasComponent } from './../components/grafico-donas/grafico-donas.component';
import { SharedModule } from './../shared/shared.Module';

import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';

import {FormsModule} from '@angular/forms';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

import { ChartsModule } from 'ng2-charts';
import { AcountSettingComponent } from './acount-setting/acount-setting.component';
// npm install --save ng2-charts
// npm install --save chart.js

@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Grafica1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonasComponent,
        AcountSettingComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Grafica1Component,
        PagesComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule {}
