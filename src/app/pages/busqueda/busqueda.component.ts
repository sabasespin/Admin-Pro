import { URL_SERVICIOS } from './../../conf/conf';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { Medico } from 'src/app/models/medico.models';
import { Hospital } from 'src/app/models/hospital.models';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
usuario: Usuario[] = [];
medico: Medico[] = [];
hospital: Hospital[] = [];
termino: string;
  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) {
    activatedRoute.params.subscribe( params => {
    const termino = params.termino;
    this.termino = termino;
    this.buscar(termino);
    });

   }

  ngOnInit() {
  }

  buscar(termino: string) {

    const url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url).subscribe( (resp: any) => {
    this.usuario = resp.usuarios;
    this.medico = resp.medicos;
    this.hospital = resp.hospitales;
    // console.log(resp);

    });

  }

}
