import { Usuario } from './../../models/usuario.models';
import { UsuariosService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
usuario: Usuario;
  constructor(public usuarioservise: UsuariosService, public router: Router) { }

  ngOnInit() {
    this.usuario = this.usuarioservise.usuario ;
  }
buscar(termino: string) {
this.router.navigate(['/busqueda', termino]);
}
}
