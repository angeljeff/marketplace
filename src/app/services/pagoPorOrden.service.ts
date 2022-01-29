import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PagoPorOrden } from "../clases/pagoPorOrden";

@Injectable({
  providedIn: "root",
})
export class PagoPorOrdenService{
  //private URL = "http://159.223.107.115:3000/pagoorden";
  private URL = 'http://localhost:3000/pagoorden';

  constructor(private http: HttpClient) {}

  registrarPago(pago : PagoPorOrden) {
    return this.http.post<any>(this.URL + "/agregar", pago);
  }

 /*  traerOrdenPorUsuario(orden : OrdenCompra ) {
    return this.http.post<any>(this.URL + `/traerOrdenUsuario/${orden.cedula}`, orden);
  }

  actualizarOrden(orden : OrdenCompra ) {
    return this.http.put<any>(this.URL + `/actualizar/${orden.id_orden_compra}`, orden);
  } */

  
}
