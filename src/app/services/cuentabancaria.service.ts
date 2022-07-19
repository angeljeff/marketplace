import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { DatosPago } from "../clases/datosPago";

@Injectable({
  providedIn: "root",
})
export class DatoscuentabancoService{
  private URL = "http://137.184.0.8:3000/Cuentasb";
  //private URL = 'http://localhost:3000/Cuentasb';

  constructor(private http: HttpClient, private router: Router) {}

  registrarcuentaB(cuentabanco : DatosPago) {
    return this.http.post<any>(this.URL + "/Agregarcuentabanco", cuentabanco);
  }
  consultardatosbancarios(cuentabanco : DatosPago) {
    return this.http.post<any>(this.URL + `/obtenermetodos/${cuentabanco.id_metodo_pago_tienda}`, cuentabanco);
  }

  consultartodosdatosbancarios(cuentabanco : DatosPago) {
    return this.http.post<any>(this.URL + `/obtenerdatospago/${cuentabanco.id_metodo_pago_tienda}`, cuentabanco);
  }

  actualizarestadocuentabancaria(cuentabanco : DatosPago) {
    return this.http.put<any>(this.URL + `/activar/${cuentabanco.id_cuenta_banco}`, cuentabanco);
  }


  
}
