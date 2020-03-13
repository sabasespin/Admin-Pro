// import { UsuariosService } from './../../services/service.index';
import { Hospital } from '../../models/hospital.models';
import { Injectable } from '@angular/core';
import { SubirarchivoService } from '../subir-archivo/subirarchivo.service';
import { URL_SERVICIOS } from '../../conf/conf';
import {HttpClient} from '@angular/common/http' ;
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2' ;
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  hospital: Hospital;
  totaldeHopitales: number = 0;

  constructor(public http: HttpClient , public route: Router, public subirarchivo: SubirarchivoService ) { }

  crearHospital(hospital: Hospital, token: string) {

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + token;
    return this.http.post(url, hospital)
    .pipe(map( (resp: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Importante...',
        text: 'Hospital creado! ' + hospital.nombre
        // footer: '<a href>Why do I have this issue?</a>'
      });
      return resp.hospital ;
    }) );
    }

    borrarHospital(id: string, token: string) {
      let url = URL_SERVICIOS + '/hospital/' + id;
      url += '?token=' + token ;
      return this.http.delete(url).
      pipe( map( (resp: any) => {
        Swal.fire(
          'Borrado!',
          'El hospital fue borrado',
          'success'
        );
        return true;
      } ) );

    }

    actualizarHospital(hospital: Hospital, token: string) {
      let url = URL_SERVICIOS + '/hospital/' + hospital._id;
      url += '?token=' + token ;
      return this.http.put(url, hospital)
      .pipe(map( (resp: any) => {

        Swal.fire({
        icon: 'success',
        title: 'Importante...',
        text: 'Hospital actualizado! ' + hospital.nombre
        // footer: '<a href>Why do I have this issue?</a>'
      });
        return true;
      }));
    }

    cambiarImagen(archivo: File, id: string) {
      this.subirarchivo.subirArchivo(archivo, 'hospitales', id)
      .then( (resp: any) => {
        this.hospital.img = resp.hospital.img ;
        Swal.fire({
          icon: 'success',
          title: 'Importante...',
          text: 'Imagen actualizada! ' + this.hospital.nombre
          // footer: '<a href>Why do I have this issue?</a>'
        });

      } )
      .catch( resp => {
        console.log(resp);
      } );

    }

    cargarHospitales() {
      const url = URL_SERVICIOS + '/hospital';

      return this.http.get(url)
      .pipe( map( (resp: any) => {
        this.totaldeHopitales = resp.total;
        // console.log(resp.hospital);
        return resp.hospital;

      } ) );
    }

    buscarHospitales(termino: string) {
      const url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino;

      return this.http.get(url);
    }

    obtenerHospital(id: string) {
      const url = URL_SERVICIOS + '/hospital/' + id;
      return this.http.get(url).pipe(map( (resp: any) => {
        return resp.hospital;
      }));
    }


}
