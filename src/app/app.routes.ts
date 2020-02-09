import { RegisterComponent } from './login/register.component';
import { LoginComponent } from './login/login.component';

import {RouterModule, Routes} from '@angular/router' ;
import { P404Component } from './shared/p404/p404.component';

const appRoutes: Routes = [

    { path: 'login' , component: LoginComponent } ,
    { path: 'login' , component: LoginComponent } ,
    { path: 'register' , component: RegisterComponent } ,
    { path: '**', component: P404Component }
] ;

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true} );
