import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../clases/usuario";

@Injectable({
  providedIn: "root",
})
export class UsuarioService{
  //private URL = 'http://192.168.100.251:3000/usuario';
 // private URL = "http://137.184.0.8:3000/usuario";

  private URL = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient) {}

  listarUsuariosAdministradores() {
    return this.http.get<any>(this.URL + "/listarAdministradores");
  }

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
