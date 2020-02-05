import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyC4DQPpAJY77-GCsEfPDnaQ60w6dTUn14I';
  private userToken: string;

  constructor( private http: HttpClient) {
    this.getToken();
  }

  logout() { }

  login( usuario: Usuario ) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${ this.url }signInWithPassword?key=${ this.apiKey }`, authData
    ).pipe(
      map( resp => {
        this.saveToken( resp['idToken'] );
      })
    );
  }

  nuevoUsuario( usuario: Usuario ) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signUp?key=${ this.apiKey }`, authData
    ).pipe(
      map( resp => {
        this.saveToken( resp['idToken'] );
      })
    );
  }

  private saveToken( idToken: string ){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  private getToken() {
    if ( localStorage.getItem('token') ){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
  }
}
