import { SubirarchivoService } from './../subir-archivo/subirarchivo.service';
import { URL_SERVICIOS } from './../../conf/conf';
import { Injectable } from '@angular/core';
import { Usuario } from './../../models/usuario.models';
import {HttpClient} from '@angular/common/http' ;
import { map } from 'rxjs/operators';
import {catchError} from 'rxjs/operators/';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2' ;
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
token: string;
usuario: Usuario;
menu: any[] = [];

  constructor(public http: HttpClient, public route: Router, public subirarchivo: SubirarchivoService) {
    this.cargardelStoragge();
   }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id' , id );
    localStorage.setItem('token' , token );
    localStorage.setItem('usuario' , JSON.stringify(usuario)  );
    localStorage.setItem('menu' , JSON.stringify(menu)  );
    this.token = token;
    this.usuario = usuario;
    this.menu = menu;
  }
estalogueado() {
 return (this.token.length > 5 ) ? true : false ;
}

cargardelStoragge() {
if (localStorage.getItem('token')) {
  this.token = localStorage.getItem('token') ;
  this.usuario = JSON.parse(localStorage.getItem('usuario'));
  this.menu = JSON.parse(localStorage.getItem('menu'));
} else {
  this.token = '';
  this.usuario = null ;
  this.menu = [];
 // this.route.navigate(['/login']);
}
}

logout() {
this.token = '';
this.usuario = null;
this.menu = [];

localStorage.removeItem('token');
localStorage.removeItem('usuario');
localStorage.removeItem('menu');

this.route.navigate(['/login']);
}

loginGoogle(token: string) {
  const url = URL_SERVICIOS + '/login/google' ;

  return this.http.post(url, {token})
  .pipe(map( (resp: any) => {
     this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu) ;
    // console.log(resp);
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
    this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
    return true ;
  })
  , catchError( err => {
    // console.log(err.error.mensaje);
    Swal.fire({
      icon: 'error',
      title: 'Error en el Login...',
      text: err.error.mensaje
      // footer: '<a href>Why do I have this issue?</a>'
    });
    return throwError(err);
} )
  );

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
})
, catchError( err => {
  // console.log('error' , err.error);
  Swal.fire({
    icon: 'error',
    title: err.error.mensaje,
    text: err.error.error.errors.email.message
    // footer: '<a href>Why do I have this issue?</a>'
  });
  return throwError(err);
} )
);

}

borrarUsuario(id: string) {
  let url = URL_SERVICIOS + '/usuarios/' + id;
  url += '?token=' + this.token ;
  return this.http.delete(url).
  pipe( map( (resp: any) => {
    Swal.fire(
      'Borrado!',
      'El usuario fue borrado',
      'success'
    );
    return true;
  } ) );

}

actualizarUsuario(usuario: Usuario) {
  let url = URL_SERVICIOS + '/usuarios/' + usuario._id;
  url += '?token=' + this.token ;
  return this.http.put(url, usuario)
  .pipe(map( (resp: any) => {
    if (usuario._id === this.usuario._id) {
      const usuarioDb = this.usuario;
      this.guardarStorage(usuarioDb._id, this.token, usuarioDb, this.menu );
    }
    Swal.fire({
    icon: 'success',
    title: 'Importante...',
    text: 'Usuario actualizado! ' + usuario.nombre
    // footer: '<a href>Why do I have this issue?</a>'
  });
    return true;
  }));
}

cambiarImagen(archivo: File, id: string) {
  this.subirarchivo.subirArchivo(archivo, 'usuarios', id)
  .then( (resp: any) => {
    this.usuario.img = resp.usuario.img ;
    Swal.fire({
      icon: 'success',
      title: 'Importante...',
      text: 'Imagen actualizada! ' + this.usuario.nombre
      // footer: '<a href>Why do I have this issue?</a>'
    });

    this.guardarStorage(id, this.token, this.usuario, this.menu);

  } )
  .catch( resp => {
    console.log(resp);
  } );

}

cargarUsuarios(desde: number = 0) {
  const url = URL_SERVICIOS + '/usuarios?desde=' + desde ;

  return this.http.get(url);
}

buscarUsuarios(termino: string) {

  const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

  return this.http.get(url);
}

}
