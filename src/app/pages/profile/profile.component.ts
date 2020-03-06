import { Usuario } from './../../models/usuario.models';
import { UsuariosService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ReadStream } from 'fs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
usuario: Usuario;
imagenSubir: File;
imagenTemp: any;

  constructor(public usuarioservice: UsuariosService) {
    this.usuario = this.usuarioservice.usuario ;
    // console.log('Usuario en constructor', this.usuario) ;
   }

   guardar(usuarioa: Usuario) {
    this.usuario.nombre = usuarioa.nombre ;
    if (!this.usuario.google) {
      this.usuario.email = usuarioa.email ;
    }

    this.usuarioservice.actualizarUsuario(this.usuario)
    .subscribe( resp => {
      console.log(resp);
    });

   }

  ngOnInit() {
  }

  seleccionImagen(archivo) {
    if (!archivo) {
      this.imagenSubir = null;
    }


    if (archivo.type.indexOf('image') < 0  ) {
      Swal.fire({
        icon: 'error',
        title: 'Informacion...',
        text: 'Debe ser una imagen! ' + this.usuario.nombre
        // footer: '<a href>Why do I have this issue?</a>'
      });
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    };

  }


  cambiarImagen() {
    this.usuarioservice.cambiarImagen(this.imagenSubir, this.usuario._id) ;

  }

}
