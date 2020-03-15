import { URL_SERVICIOS } from './../conf/conf';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img' ;

    if (!img) {
        return url + '/usuarios/xyxyxyx' ;
       }

    if ( img.indexOf('http') >= 0 ) {
         return img;
    }

    switch (tipo) {
      case 'usuario' :
       url += '/usuarios/' + img ;
       break;
      case 'hospital' :
        url +=  '/hospitales/' + img ;
        break;
      case 'medico' :
        url +=  '/medicos/' + img ;
        break;
      default:
        console.log('Tipo no valido, Son:  Usuarios, Medicos, Hospitales') ;
        url += '/usuarios/xyxyxyx' ;
    }
    return url;
  }

}
