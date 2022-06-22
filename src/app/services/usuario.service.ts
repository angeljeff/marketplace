import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../clases/usuario";

@Injectable({
  providedIn: "root",
})
export class UsuarioService{
  //private URL = 'http://192.168.100.251:3000/usuario';
  //private URL = "http://137.184.0.8:3000/usuario";

  private URL = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient) {}

  listarUsuariosAdministradores() {
    return this.http.get<any>(this.URL + "/listarAdministradores");
  }
  listarUsuariosclientes() {
    return this.http.get<any>(this.URL + "/listarClientes");
  }
  listarUsuariosPropietarios() {
    return this.http.get<any>(this.URL + "/listarPropietariosdenegocios");
  }


  registrar(usuario : Usuario) {
    return this.http.post<any>(this.URL + "/create", usuario);
  }

  actualizar(usuario : Usuario) {
    return this.http.put<any>(this.URL + `/update/${usuario.cedula}`, usuario);
  }
  
  actualizar_contrasenia(usuario : Usuario) {
    console.log("es la contr aqq recibo "+usuario.contrasenia)
   
    return this.http.put<any>(this.URL + `/update_cont/${usuario.cedula}`, usuario);
  }


  obtenerDatoCedula(usuario : Usuario) {
    return this.http.post<any>(this.URL + `/obtener/${usuario.cedula}`, usuario);
  }
  obtenerDatoCedulaycorreo(usuario : Usuario) {
    return this.http.post<any>(this.URL + "/obtenerporcorreoyced", usuario);
  }
  obtenerDatoCedulaycorreoactualizar(usuario : Usuario) {
    return this.http.post<any>(this.URL + "/obtenerporcorreoycedactualizar", usuario);
  }

  
}
