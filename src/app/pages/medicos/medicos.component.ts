import { ImagenPipe } from './../../pipes/imagen.pipe';
import { MedicosService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
medicos: Medico[] = [];

  constructor(public medicosservicio: MedicosService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
  this.medicosservicio.cargarMedicos()
  .subscribe( medicos => this.medicos = medicos ) ;
  }

buscarMedicos(termino: string) {
  if (termino.length <= 0) {
    this.cargarMedicos();
    return;
  }

  this.medicosservicio.buscarMedicos(termino)
  .subscribe( (medicos: any) => {
    // console.log(medicos);
    this.medicos = medicos.medicos;
  });
}

borrarMedico(medico: Medico) {
  Swal.fire({
    title: 'Esta usted seguro?',
    text: 'Esto no puede ser revertido ! Medico a borrar: ' + medico.nombre ,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borralo!'
  }).then((result) => {
    if (result.value) {
      this.medicosservicio.borrarMedico(medico._id)
      .subscribe( (borrado: boolean) => {
        this.cargarMedicos();
      } );

    }
  });
}
}
