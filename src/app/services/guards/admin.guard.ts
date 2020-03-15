import { UsuariosService } from './../usuarios/usuarios.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public usuarioservice: UsuariosService) {

  }
  canActivate(
    ) {
      if (this.usuarioservice.usuario.role === 'ADMIN_ROLE') {
        return true;

      } else {
        console.log('Bloqueado por el Guards Admin');
        this.usuarioservice.logout();
        return false;
      }
  }

}
