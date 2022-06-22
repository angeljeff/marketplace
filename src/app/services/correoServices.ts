import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Correo } from "../clases/Correo";

@Injectable({
  providedIn: "root",
})
export class CorreoService{
  private URL = 'http://137.184.0.8:3000/correo';
  //private URL = 'http://localhost:3000/correo';

  constructor(private http: HttpClient, private router: Router) {}

  enviar_correo_contrasenia(correo : Correo) {
    return this.http.post<any>(this.URL + "/enviarcorreocontra", correo);
  }
  
  enviar_correo_aprobacion_producto(correo : Correo) {
    return this.http.post<any>(this.URL + "/enviarcorreoaprueba", correo);
  }

  enviar_correo_aprobacion_pedido(correo : Correo) {
    return this.http.post<any>(this.URL + "/enviarcorreoapruebapedido", correo);
  }
  

  
}