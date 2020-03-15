import { UsuariosService } from './../usuarios/usuarios.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
menu: any[] = [];
  /* menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge' ,
      submenu: [
        {titulo: 'Dashboard', url: '/dashboard'} ,
        {titulo: 'Progressbar', url: '/progress'} ,
        {titulo: 'Graficas 1', url: '/grafica1'},
        {titulo: 'Promesas', url: '/promesas'},
        {titulo: 'Observables', url: '/rxjs'}

      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url: '/usuarios'},
        {titulo: 'Hospitales', url: '/hospitales'},
        {titulo: 'Medicos', url: '/medicos'}
      ]
    }
  ] ; */

  constructor(public usuarioservise: UsuariosService) {

   }
   cargarMenu() {
    this.menu = this.usuarioservise.menu;
   }
}
