import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html'

})
export class IncrementadorComponent implements OnInit {
@ViewChild('txtProgreso' ,  {static: false} ) txtProgreso: ElementRef ;

@Input() progreso: number = 20;
@Input() leyenda: string = 'Leyenda' ;

@Output() cambiodevalor: EventEmitter<number>  = new EventEmitter() ;

  constructor() { }

  ngOnInit() {
  }

  onChangue(newvalue: number) {

  // const elementHTML: any = document.getElementsByName('progreso')[0] ;

  if (newvalue >= 100) {
    this.progreso = 100 ;
  } else if (newvalue <= 0) {
    this.progreso = 0;
  } else {
    this.progreso = newvalue ;
  }
  // elementHTML.value = this.progreso ;
  this.txtProgreso.nativeElement.value = this.progreso ;
  this.cambiodevalor.emit(this.progreso) ;
  this.txtProgreso.nativeElement.focus() ;
  }

  cambiavalor(valor) {

    if (this.progreso < 0 || this.progreso >= 100) {
      return ;
    }
    this.progreso = this.progreso + valor ;
    this.cambiodevalor.emit(this.progreso) ;
  }
}
