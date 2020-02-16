import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcums',
  templateUrl: './breadcums.component.html',
  styles: []
})
export class BreadcumsComponent implements OnInit {
titulo: string;
  constructor(private route: Router, private title: Title, private meta: Meta) {
   this.getdataRow()
    .subscribe( evento => {
     // console.log('events', evento);
     this.titulo = evento.titulo;
     this.title.setTitle( this.titulo);
     const metatag: MetaDefinition = {
       name: 'Description' ,
       contenido: this.titulo
     };
     this.meta.updateTag(metatag);
    } );
   }

  ngOnInit() {
  }
  getdataRow() {
    return  this.route.events.pipe(
      filter(  evento => evento instanceof ActivationEnd),
      filter(  (evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map( (evento: ActivationEnd) => evento.snapshot.data )

    );

  }

}
