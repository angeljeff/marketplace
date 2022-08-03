import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Met_pag_tienda } from "../clases/metodopagotienda";
import { Ventas } from "../clases/ventas";

@Injectable({
  providedIn: "root",
})
export class VentasService{

  private URL = 'http://137.184.0.8:3000/ventas';
 // private URL = 'http://localhost:3000/ventas';

  constructor(private http: HttpClient, private router: Router) {}

  agregarventa(venta : Ventas) {
    return this.http.post<any>(this.URL + `/Agregar`, venta);
  }

  obtener_datos_ventas_prediccion(fecha : string) {
    return this.http.post<any>(this.URL + `/prediccion/${fecha}`,fecha);
  }


  

  

  
}
