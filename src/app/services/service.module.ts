import { ModalUploadService } from './../components/modal-upload/modal-upload.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import {
SettingService,
SharedService,
SidebarService,
UsuariosService,
LoginGuardsGuard,
SubirarchivoService,
HospitalesService,
MedicosService
 } from './service.index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ] ,
  providers: [SettingService,
             SharedService,
             SidebarService,
             UsuariosService,
             LoginGuardsGuard,
             SubirarchivoService,
             ModalUploadService,
             HospitalesService,
             MedicosService

  ]
})
export class ServiceModule { }
