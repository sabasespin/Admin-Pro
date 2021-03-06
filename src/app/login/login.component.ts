import { UsuariosService } from './../services/usuarios/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.models';

declare function init_plugin();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 recuerdame: boolean = false;
 email: string;
 auth2: any;

  constructor(public router: Router, public usuarioservice: UsuariosService) { }

  ngOnInit() {
     init_plugin();
     this.email = localStorage.getItem('email') || ' ' ;
     if (this.email.length > 1) {
       this.recuerdame = true;
     }
     this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
     this.auth2 = gapi.auth2.init({
       client_id : '419484852627-99rfscrjr5h17cq51duuuf8pb5d47o7v.apps.googleusercontent.com' ,
       cookiepolicy: 'single_host_origin' ,
       scope: 'profile email'
     } );
     this.attachSigninGoogle(document.getElementById('btnGoogle'));
    });
  }

  attachSigninGoogle(elemento) {
    this.auth2.attachClickHandler(elemento, {} , googleUser => {
     const profile = googleUser.getBasicProfile();
     const token = googleUser.getAuthResponse().id_token ;

     this.usuarioservice.loginGoogle(token)
     .subscribe( resp => window.location.href = '#/dashboard') ;

    // console.log(profile);
    // console.log(token);
    } );
  }

  ingresar(f: NgForm) {
   if (!f.valid) {
     return ;
   }
   const usuario = new Usuario(
     null,
     f.value.email ,
     f.value.password
   );

   this.usuarioservice.login(usuario, f.value.recuerdame)
   .subscribe(resp => this.router.navigate(['/dashboard'])) ;

   // console.log(f.value);
   // this.router.navigate(['/dashboard']) ;
  }

}
