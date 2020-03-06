import { URL_SERVICIOS } from './../../conf/conf';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubirarchivoService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: string ) {
    return new Promise( (resol, reject) => {
     const formData = new FormData();
     const xhr = new XMLHttpRequest();
     formData.append('imagen', archivo, archivo.name);

     // tslint:disable-next-line:only-arrow-functions
     xhr.onreadystatechange = function() {

       if (xhr.readyState === 4) {
         if (xhr.status === 200) {
           console.log('Imagen subida corretamente');
           resol(JSON.parse(xhr.response));
         } else {
          console.log('Fallo la subida');
          reject(xhr.statusText);
         }
       }
     };
     const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
     console.log('url..', url);
     xhr.open('PUT', url, true);
     xhr.send(formData);
    });

  }
}
