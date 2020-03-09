import { SubirarchivoService } from './../subir-archivo/subirarchivo.service';
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

  constructor(public http: HttpClient, public route: Router, public subirarchivo: SubirarchivoService ) {
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
 // this.route.navigate(['/login']);
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
      this.guardarStorage(usuarioDb._id, this.token, usuarioDb);
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

    this.guardarStorage(id, this.token, this.usuario);

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
