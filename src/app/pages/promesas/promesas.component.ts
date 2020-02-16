import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {


    this.sumatres().then( () => {
     console.log('salio bien');
    } ).catch( error => console.log('error') );
   }

  ngOnInit() {
  }

  sumatres() {
    return new Promise( (resolve, reject) => {
      let contador: number = 0;

      const intervalo = setInterval( () => {
      contador += 1;
      console.log(contador);
      if (contador === 3) {
        resolve();
        clearInterval(intervalo);
      }
      }, 1000 );
      } );
  }

}
