import { URL_SERVICIOS } from './../../conf/conf';
import { Injectable } from '@angular/core';
import { Usuario } from './../../models/usuario.models';
import {HttpClient} from '@angular/common/http' ;
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2' ;
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
token: string;
usuario: Usuario;

  constructor(public http: HttpClient, public route: Router ) {
    this.cargardelStoragge();
   }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id' , id );
    localStorage.setItem('token' , token );
    localStorage.setItem('usuario' , JSON.stringify(usuario)  );
    this.token = token;
    this.usuario = usuario;
  }
estalogueado() {
 return (this.token.length > 5 ) ? true : false ;
}

cargardelStoragge() {
if (localStorage.getItem('token')) {
  this.token = localStorage.getItem('token') ;
  this.usuario = JSON.parse(localStorage.getItem('usuario'));
} else {
  this.token = '';
  this.usuario = null ;
  this.route.navigate(['/login']);
}
}

logout() {
this.token = '';
this.usuario = null;
localStorage.removeItem('token');
localStorage.removeItem('usuario');
this.route.navigate(['/login']);
}

loginGoogle(token: string) {
  const url = URL_SERVICIOS + '/login/google' ;

  return this.http.post(url, {token})
  .pipe(map( (resp: any) => {
     this.guardarStorage(resp.id, resp.token, resp.usuario) ;
     return true;
  }));
}

  login(usuario: Usuario, recordar: boolean ) {

  if (recordar) {
    localStorage.setItem('email', usuario.email) ;
  } else {
    localStorage.removeItem('email');
  }
  const url = URL_SERVICIOS + '/login' ;

  return this.http.post(url, usuario)
  .pipe(map( (resp: any) => {
    this.guardarStorage(resp.id, resp.token, resp.usuario);
    return true ;
  } ));
  }

crearUsuario(usuario: Usuario) {

const url = URL_SERVICIOS + '/usuarios';

return this.http.post(url, usuario)
.pipe(map( (resp: any) => {
  Swal.fire({
    icon: 'success',
    title: 'Importante...',
    text: 'Usuario creado! ' + usuario.email
    // footer: '<a href>Why do I have this issue?</a>'
  });
  return resp.usuario ;
}) );
}
}
