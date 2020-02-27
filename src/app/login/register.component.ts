import { Usuario } from './../models/usuario.models';
import { UsuariosService } from './../services/service.index';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2' ;
import { Router } from '@angular/router';

declare function init_plugin();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})

export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public usuarioService: UsuariosService, public route: Router) { }


  ngOnInit() {
    init_plugin();
    this.forma = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required ) ,
        email: new FormControl(null, [Validators.required, Validators.email])  ,
        password: new FormControl(null, Validators.required) ,
        password2: new FormControl(null, Validators.required) ,
        condiciones: new FormControl(false)
      }, {validators: this.soniguales('password', 'password2')} );

  }

  soniguales(campo1: string, campo2: string) {

    return ( group: FormGroup) => {
       const pass1 = group.controls[campo1].value;
       const pass2 = group.controls[campo2].value;

       if (pass1 === pass2) {
         return null ;
       }
       return {
         soniguales: true
       } ;
    };
  }

  CrearUsuario() {

    if (this.forma.invalid) {
      return ;
    }

    if (!this.forma.value.condiciones)  {
      Swal.fire({
        icon: 'error',
        title: 'Importante...',
        text: 'Debe de aceptar los terminos y condiciones!'
        // footer: '<a href>Why do I have this issue?</a>'
      });
      return;
    }

    console.log(this.forma.value) ;
    const usuario = new Usuario(
       this.forma.value.nombre ,
       this.forma.value.email ,
       this.forma.value.password,

    ) ;

    this.usuarioService.crearUsuario(usuario)
    .subscribe( resp => {
     console.log(resp);
     this.route.navigate(['/login']) ;
    } );



  }

}
