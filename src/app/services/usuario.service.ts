import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Usuario } from "../clases/usuario";

@Injectable({
  providedIn: "root",
})
export class UsuarioService{
  private URL = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient) {}

  registrar(usuario : Usuario) {
    return this.http.post<any>(this.URL + "/create", usuario);
  }

  actualizar(usuario : Usuario) {
    return this.http.put<any>(this.URL + `/update/${usuario.cedula}`, usuario);
  }

  obtenerDatoCedula(usuario : Usuario) {
    return this.http.post<any>(this.URL + `/obtener/${usuario.cedula}`, usuario);
  }
  
}
