import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Tienda } from "../clases/tienda";

@Injectable({
  providedIn: "root",
})
export class TiendaService{
  //private URL = "http://159.223.107.115:3000/usuario";
  private URL = 'http://localhost:3000/tienda';

  constructor(private http: HttpClient, private router: Router) {}

  registrar(tienda : Tienda) {
    return this.http.post<any>(this.URL + "/Agregar", tienda);
  }

   obtener_datos_tienda(tienda : Tienda) {
     console.log(tienda.cedula)
    return this.http.post<any>(this.URL + `/obtenertienda/${tienda.cedula}`, tienda);
  }
 
  actualizar(tienda : Tienda) {
    return this.http.put<any>(this.URL + `/actualizar/${Number(tienda.id_tienda)}`, tienda);
  }
  
}
