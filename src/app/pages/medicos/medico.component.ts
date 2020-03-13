import { UsuariosService } from './../../services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Medico } from './../../models/medico.models';
import { HospitalesService } from './../../services/service.index';
import { MedicosService } from './../../services/service.index';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
hospitales: Hospital[] = [];
medico: Medico = new Medico('', '', '', '');
hospital: Hospital = new Hospital('');

  constructor(public medicosservice: MedicosService, public hospitalservice: HospitalesService ,
              public router: Router,
              public usuariosService: UsuariosService,
              public activatedRoute: ActivatedRoute,
              public modalUploadService: ModalUploadService) {

              activatedRoute.params.subscribe( params => {
                const id = params.id;
                if (id !== 'nuevo') {
                    this.cargarMedico(id);
                }
              });

       }

  ngOnInit() {
    this.hospitalservice.cargarHospitales()
    .subscribe( hospitales => {
     // console.log(hospitales);
      this.hospitales = hospitales;

      this.modalUploadService.notificacion.subscribe( resp => {
       // console.log('Respuesta: ' , resp);
        this.medico.img = resp.medicoactualizado.img;
      });
    } );
  }
  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }
    this.medicosservice.guardarMedico(this.medico).
    subscribe( resp => {
      this.medico._id = resp._id;
      this.router.navigate(['/medico' , resp._id]) ;
    });

  }

  cargarMedico(id: string) {
    this.medicosservice.cargarMedico(id)
    .subscribe( medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    } );
  }

  cambioHospital(id: string) {
        this.hospitalservice.obtenerHospital(id).
        subscribe( resp => {
         // console.log(resp);
          this.hospital = resp;
});
  }

  cambiarFoto() {
   this.modalUploadService.mostrarModal('medicos', this.medico._id );
  }

}
