import { SettingService } from '../../services/service.index';
import { DOCUMENT } from '@angular/common';
import { browser } from 'protractor';
import { Component, OnInit, Inject } from '@angular/core';


@Component({
  selector: 'app-acount-setting',
  templateUrl: './acount-setting.component.html',
  styleUrls: ['./acount-setting.component.css']
})
export class AcountSettingComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private document, public ajustes: SettingService ) { }

  ngOnInit() {
    this.colocarCheck() ;
  }

  cambiacolor(tema: string, link: any) {
    // console.log(tema);
    // console.log(link);
    this.aplicarchecked(link);
    this.ajustes.aplicarAjustes(tema);
  }
  aplicarchecked(link: any) {
    const selectores: any = this.document.getElementsByClassName('selector') ;
    for ( const ref of selectores) {
        ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck() {
    console.log('En colocar check') ;
    const selectores: any = this.document.getElementsByClassName('selector') ;
    const tema = this.ajustes.ajuste.tema ;
    for ( const ref of selectores) {
        if ( ref.getAttribute('data-theme') === tema ) {
        ref.classList.add('working');
        break;
       }
    }
  }

}
