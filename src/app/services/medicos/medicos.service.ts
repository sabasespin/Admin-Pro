import { URL_SERVICIOS } from './../../conf/conf';
import { UsuariosService } from './../usuarios/usuarios.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.models';


@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  totalMedicos: number = 0;
  constructor(public http: HttpClient, public usuarioservice: UsuariosService) { }

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico' ;

    return this.http.get(url)
    .pipe(map( (resp: any) => {
         this.totalMedicos = resp.total;
         // console.log('Servicio' , resp);
         return resp.medico;
    }));
    }

    cargarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url)
    .pipe(map( (resp: any) => resp.medico ));
    }


    buscarMedicos(termino: string) {

      const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
      return this.http.get(url)
      .pipe(map( (resp: any) => {
       // console.log('servicio busqueda', resp);
        return resp;
      }
     ));
    }

    borrarMedico(id: string) {
      let url = URL_SERVICIOS + '/medico/' + id;
      url += '?token=' + this.usuarioservice.token ;
     // console.log('servicio de borrar', url);
      return this.http.delete(url).
      pipe( map( (resp: any) => {
        Swal.fire(
          'Borrado!',
          'El medico fue borrado',
          'success'
        );
        return true;
      } ) );
    }

    guardarMedico(medico: Medico) {

      let url = URL_SERVICIOS + '/medico';


      if (medico._id) {
        // actualizar
        console.log('medico a actualizar', medico);
        url += '/' + medico._id;
        url += '?token=' + this.usuarioservice.token;
        console.log(url);
        return this.http.put(url, medico).
        pipe(map( (resp: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Informacion...',
            text: 'El médico ' + medico.nombre + ' fue actualizado !'
            // footer: '<a href>Why do I have this issue?</a>'
          });

          return resp.medico;

        } ));

      } else {
        // nuevo
      console.log('medico a crear', medico);
      url += '?token=' + this.usuarioservice.token;
      return  this.http.post(url , medico)
      .pipe(map( (resp: any) => {
     // console.log(medico);
      Swal.fire({
        icon: 'success',
        title: 'Informacion...',
        text: 'El médico ' + medico.nombre + ' fue creado !'
        // footer: '<a href>Why do I have this issue?</a>'
      });
      return resp.medico;
      }));
    }

  }

}
