import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit() {
    this.usuario = new Usuario();
  }

  login( form: NgForm ) {
    if ( form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.login( this.usuario ).subscribe(
      resp => {
        console.log(resp);
        Swal.close();
        this.router.navigateByUrl('/home');
      },
      err => {
        console.log(err.error.error.message);
        Swal.fire({
          allowOutsideClick: false,
          icon: 'error',
          title: 'Error al authenticar',
          text: err.error.error.message
        });
      }
    );
  }

}
