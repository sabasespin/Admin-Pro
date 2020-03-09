import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { SubirarchivoService } from './../../services/subir-archivo/subirarchivo.service';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

imagenSubir: File;
imagenTemp: any;

  constructor(public subirarchivoservicio: SubirarchivoService, public modaluploadservice: ModalUploadService) { }

  ngOnInit() {
  }

cerrarModal() {
this.imagenSubir = null;
this.imagenTemp = null;
this.modaluploadservice.ocultarModal();
}

  seleccionImagen(archivo) {
    if (!archivo) {
      this.imagenSubir = null;
    }


    if (archivo.type.indexOf('image') < 0  ) {
      Swal.fire({
        icon: 'error',
        title: 'Informacion...',
        text: 'Debe ser una imagen! '
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
  subirImagen() {
    this.subirarchivoservicio.subirArchivo(this.imagenSubir, this.modaluploadservice.tipo, this.modaluploadservice.id)
    .then( resp => {
    console.log(resp);
    this.modaluploadservice.notificacion.emit(resp);
    this.cerrarModal();
    })
    .catch( err => {
      console.log('Error en la carga', err);
    });
  }

}
