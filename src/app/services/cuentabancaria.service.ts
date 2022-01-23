import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { DatosPago } from "../clases/datosPago";

@Injectable({
  providedIn: "root",
})
export class DatoscuentabancoService{
  //private URL = "http://159.223.107.115:3000/usuario";
  private URL = 'http://localhost:3000/Cuentasb';

  constructor(private http: HttpClient, private router: Router) {}

  registrarcuentaB(cuentabanco : DatosPago) {
    return this.http.post<any>(this.URL + "/Agregarcuentabanco", cuentabanco);
  }

/*    obtener_datos_tienda(tienda : Tienda) {
    return this.http.post<any>(this.URL + `/obtenertienda/${tienda.cedula}`, tienda);
  }
 
  actualizar(tienda : Tienda) {
    return this.http.put<any>(this.URL + `/actualizar/${Number(tienda.id_tienda)}`, tienda);
  } */
  
}
