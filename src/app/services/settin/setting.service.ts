import { Injectable , Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  ajuste: Ajustes = {
    temaurl: 'assets/css/colors/default.css',
    tema: 'default'
  } ;

  constructor(@Inject(DOCUMENT) private document ) {
    this.cargarAjustes() ;
   }

guardarAjustes() {
  localStorage.setItem('ajustes', JSON.stringify(this.ajuste)) ;
}

cargarAjustes() {
  if (localStorage.getItem('ajustes')) {
    this.ajuste = JSON.parse(localStorage.getItem('ajustes')) ;
   // console.log('Cargando del Localstorage') ;
    this.aplicarAjustes(this.ajuste.tema) ;
  } else {
   // console.log('Cargando valores por defecto') ;
    this.aplicarAjustes(this.ajuste.tema) ;
  }
}
aplicarAjustes(tema) {
  const url = `assets/css/colors/${tema}.css`;
  this.document.getElementById('tema').setAttribute('href', url) ;

  this.ajuste.tema = tema ;
  this.ajuste.temaurl = url ;
  this.guardarAjustes() ;

}
}


interface Ajustes {
 temaurl: string ;
 tema: string ;
}
