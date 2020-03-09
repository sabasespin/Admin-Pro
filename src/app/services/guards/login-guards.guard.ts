import { UsuariosService } from './../usuarios/usuarios.service';
import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';


@Injectable(
)

export class LoginGuardsGuard implements CanActivate {

  constructor(public usuarioservicio: UsuariosService) {}
  canActivate() {
    if (this.usuarioservicio.estalogueado()) {
      console.log('Paso por el Guards') ;
      return true;
    } else {
    //  console.log('No Paso por el Guards') ;
      return false;
    }
  }
}
