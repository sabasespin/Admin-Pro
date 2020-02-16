import { RxjsComponent } from './rxjs/rxjs.component';
import { PromesasComponent } from './promesas/promesas.component';
import { AcountSettingComponent } from './acount-setting/acount-setting.component';
import {RouterModule, Routes} from '@angular/router' ;
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';

const pageRoutes: Routes = [
    { path: '', component: PagesComponent, children: [
        { path: 'dashboard' , component: DashboardComponent, data: {titulo: 'Dashboard'} } ,
        { path: 'progress' , component: ProgressComponent, data: {titulo: 'Progreso'} } ,
        { path: 'grafica1' , component: Grafica1Component, data: {titulo: 'Graficas'} },
        { path: 'promesas' , component: PromesasComponent, data: {titulo: 'Promesas'} },
        { path: 'rxjs' , component: RxjsComponent , data: {titulo: 'Rxjs'}},
        { path: 'acount' , component: AcountSettingComponent, data: {titulo: 'Ajustes de Temas'} },
        { path: '' , redirectTo: '/dashboard' , pathMatch: 'full' }
    ]
}
] ;

export const PAGES_ROUTES = RouterModule.forChild(pageRoutes);

