import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario;

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit() {
    this.usuario = new Usuario();
  }

  onSubmit( form: NgForm ) {
    if ( form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario( this.usuario ).subscribe(
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
          title: 'Error al registrar',
          text: err.error.error.message
        });
      }
    );
  }

}
