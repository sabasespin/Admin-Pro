import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import {SettingService,
SharedService,
SidebarService,
UsuariosService,
LoginGuardsGuard } from './service.index';


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
             LoginGuardsGuard

  ]
})
export class ServiceModule { }
