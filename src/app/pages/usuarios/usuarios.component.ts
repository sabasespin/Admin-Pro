import { URL_SERVICIOS } from './../../conf/conf';
import { UsuariosService } from './../../services/service.index';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
usuarios: Usuario[] = [] ;
desde: number = 0;

totalRegistros: number = 0;
cargando: boolean = true ;

  constructor(public usuariosservisios: UsuariosService, public modaluploadservice: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modaluploadservice.notificacion
    .subscribe( resp => {
    this.cargarUsuarios();
    });
  }

  cargarUsuarios() {
   this.usuariosservisios.cargarUsuarios(this.desde)
   .subscribe( (resp: any) => {
   // console.log(resp.usuario);
    this.totalRegistros = resp.total;
    this.usuarios = resp.usuario;
    this.cargando = false ;

   } );
}

mostrarModal(id: string) {
this.modaluploadservice.mostrarModal('usuarios', id);
}

buscarUsuario(termino: string) {

  if (termino.length <= 0) {
    this.cargarUsuarios();
    return ;
  }
  this.cargando = true;
  this.usuariosservisios.buscarUsuarios(termino)
  .subscribe( (resp: any) => {
    this.cargando = false;
    this.usuarios = resp.usuarios;
  } );
}

  guardarUsuario(usuario: Usuario) {
   this.usuariosservisios.actualizarUsuario(usuario).
   subscribe();
  }

  borrarUsuario(usuario: Usuario) {
  if (usuario._id === this.usuariosservisios.usuario._id ) {
    Swal.fire({
      icon: 'error',
      title: 'No se puede borrar...',
      text: 'No se puede borrar asi mismo! ' + usuario.nombre
      // footer: '<a href>Why do I have this issue?</a>'
    });
    return ;
  }

  Swal.fire({
    title: 'Esta usted seguro?',
    text: 'Esto no puede ser revertido ! Usuario a borrar: ' + usuario.nombre,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borralo!'
  }).then((result) => {
    if (result.value) {
      this.usuariosservisios.borrarUsuario(usuario._id)
      .subscribe( (borrado: boolean) => {
        this.cargarUsuarios();
      } );

    }
  });

  }

  cambiarDesde(valor) {
   const  desde = this.desde + valor ;

   if (desde > this.totalRegistros) {
     return;
   }
   if (desde < 0 ) {
     return;
   }

   this.desde += valor;
   this.cargarUsuarios();
  }

}
