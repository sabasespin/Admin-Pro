import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
suscription: Subscription;
  constructor() {
    this.retornaobservable().
    subscribe(numeros => console.log('Numero Observable', numeros) ,
    error => console.error('Error', error),
    () => console.log('Completado')
    );
  }


  ngOnInit() {
  }

 ngOnDestroy() {
   this.suscription.unsubscribe() ;
 }

  retornaobservable(): Observable<any> {
    let contador = 0;
    return  new Observable(( observer: Subscriber<any> ) => {
    const intervalo = setInterval( () => {

    contador += 1;
    observer.next(contador);

    // if (contador === 6) {
    //   observer.complete();
    //   clearInterval(intervalo);
    // }

    // if (contador === 5) {
    //   clearInterval(intervalo);
    //   observer.error('Error !');
    // }

    } , 1000);
    }).pipe(

      map( resp => {
        return resp.valor;
      }),
      filter( (valor, index) => {
        if ( (valor % 2 === 1) ) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      } )
    ) ;


  }

}
