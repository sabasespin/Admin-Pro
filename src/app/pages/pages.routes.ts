
import { MedicoComponent } from './medicos/medico.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProfileComponent } from './profile/profile.component';

import { LoginGuardsGuard } from './../services/service.index';
import {AdminGuard} from '../services/service.index';

import { RxjsComponent } from './rxjs/rxjs.component';
import { PromesasComponent } from './promesas/promesas.component';
import { AcountSettingComponent } from './acount-setting/acount-setting.component';
import {RouterModule, Routes} from '@angular/router' ;
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { MedicosComponent } from './medicos/medicos.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const pageRoutes: Routes = [
        { path: '', component: PagesComponent,
        canActivate:  [LoginGuardsGuard] ,
        children: [
        { path: 'dashboard' , component: DashboardComponent, data: {titulo: 'Dashboard'} } ,
        { path: 'progress' , component: ProgressComponent, data: {titulo: 'Progreso'} } ,
        { path: 'grafica1' , component: Grafica1Component, data: {titulo: 'Graficas'} },
        { path: 'promesas' , component: PromesasComponent, data: {titulo: 'Promesas'} },
        { path: 'rxjs' , component: RxjsComponent , data: {titulo: 'Rxjs'}},
        { path: 'acount' , component: AcountSettingComponent, data: {titulo: 'Ajustes de Temas'} },
        // Mantenimientos
        { path: 'usuarios' , component: UsuariosComponent ,
         canActivate: [AdminGuard] , data: {titulo: 'Mantenimiento de Usuarios'} },
        { path: 'hospitales' , component: HospitalesComponent , data: {titulo: 'Mantenimiento de Hospitales'} },
        { path: 'medicos' , component: MedicosComponent , data: {titulo: 'Mantenimiento de Medicos'} },
        { path: 'medico/:id' , component: MedicoComponent , data: {titulo: 'Actualizar Medico'} },

        { path: 'perfil' , component: ProfileComponent, data: {titulo: 'Perfil del Usuario'} },
        { path: 'busqueda/:termino' , component: BusquedaComponent, data: {titulo: 'Buscador..'} },
        { path: '' , redirectTo: '/dashboard' , pathMatch: 'full' }
    ]
}
] ;

export const PAGES_ROUTES = RouterModule.forChild(pageRoutes);

