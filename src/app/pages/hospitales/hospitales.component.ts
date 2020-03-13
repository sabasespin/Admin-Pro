import { Hospital } from './../../models/hospital.models';
import { UsuariosService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';
import { URL_SERVICIOS } from './../../conf/conf';
import { HospitalesService } from './../../services/service.index';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [] ;
  desde: number = 0;
  token: string;
  id: string;
  totalRegistros: number = 0;
  cargando: boolean = true ;
  nombreHospital: string = '';

  constructor(public hospitalesService: HospitalesService, public http: HttpClient, public modaluploadservice: ModalUploadService,
              public usuariosservice: UsuariosService ) { }

  ngOnInit() {
    this.token = this.usuariosservice.token;
    this.id = this.usuariosservice.usuario._id;
    this.cargarHospitales();
    this.modaluploadservice.notificacion
    .subscribe( resp => {
    this.cargarHospitales();
    });
  }

  cargarHospitales() {
    this.hospitalesService.cargarHospitales()
    .subscribe( resp => {
    // console.log(resp);
     this.cargando = false ;
     this.hospitales = resp;
     this.totalRegistros = this.hospitalesService.totaldeHopitales;
    }) ;

 }

  buscarHospital(termino: string) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return ;
    }
    this.cargando = true;
    this.hospitalesService.buscarHospitales(termino)
    .subscribe( (resp: any) => {
      this.cargando = false;
      this.hospitales = resp.hospital;
    } );
  }

  guardarHospital(hospital: Hospital) {
    this.hospitalesService.actualizarHospital(hospital, this.token).
    subscribe();
  }

  async agregarHospital() {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputPlaceholder: 'Nombre del Hospital..',
      inputAttributes: {
        'aria-label': 'Escriba su mensaje aqui'
      },
      showCancelButton: true
    });

    if (text) {
     const hospital = new Hospital( text, null, this.id ) ;
     this.hospitalesService.crearHospital(hospital, this.token)
     .subscribe( resp => {
      this.cargarHospitales();
     });
      // Swal.fire(text);
    }
  }

  borrarHospital(hospital: Hospital) {

  Swal.fire({
    title: 'Esta usted seguro?',
    text: 'Esto no puede ser revertido ! Hospital a borrar: ' + hospital.nombre,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borralo!'
  }).then((result) => {
    if (result.value) {
      this.hospitalesService.borrarHospital(hospital._id, this.token)
      .subscribe( (borrado: boolean) => {
        this.cargarHospitales();
      } );

    }
  });

  }

mostrarModal(id: string) {
  this.modaluploadservice.mostrarModal('hospitales', id);
  }

}
