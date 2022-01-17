import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Usuario } from "../clases/usuario";

@Injectable({
  providedIn: "root",
})
export class UsuarioService{
  //private URL = "http://159.223.107.115:3000/usuario";
  private URL = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient, private router: Router) {}

  registrar(usuario : Usuario) {
    return this.http.post<any>(this.URL + "/register", usuario);
  }

  
}
