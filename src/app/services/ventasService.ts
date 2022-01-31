import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Met_pag_tienda } from "../clases/metodopagotienda";
import { Ventas } from "../clases/ventas";

@Injectable({
  providedIn: "root",
})
export class VentasService{

  private URL = 'http://localhost:3000/ventas';

  constructor(private http: HttpClient, private router: Router) {}

  agregarventa(venta : Ventas) {
    return this.http.post<any>(this.URL + `/Agregar`, venta);
  }


  

  

  
}
