import { Usuario } from './../../models/usuario.models';
import { UsuariosService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
usuario: Usuario;
  constructor(public usuarioservise: UsuariosService) { }

  ngOnInit() {
    this.usuario = this.usuarioservise.usuario ;
  }

}
