import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { P404Component } from './shared/p404/p404.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import {RouterModule, Routes} from '@angular/router' ;

const appRoutes: Routes = [
    { path: '', component: PagesComponent, children: [
        { path: 'dashboard' , component: DashboardComponent } ,
        { path: 'progress' , component: ProgressComponent } ,
        { path: 'grafica1' , component: Grafica1Component },
        { path: '' , redirectTo: '/dashboard' , pathMatch: 'full' }
    ]
} ,
    { path: 'login' , component: LoginComponent } ,
    { path: 'login' , component: LoginComponent } ,
    { path: 'register' , component: RegisterComponent } ,
    { path: '**', component: P404Component }
] ;

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true} );
