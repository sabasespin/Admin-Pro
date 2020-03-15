import { UsuariosService } from './../../services/service.index';
import { SidebarService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  usuario: Usuario;
  constructor( public sidebar: SidebarService, public usuarioservise: UsuariosService) { }

  ngOnInit() {
    this.usuario = this.usuarioservise.usuario;
    this.sidebar.cargarMenu();
    // console.log('Cargo el menu' , this.sidebar.menu);
  }

}
