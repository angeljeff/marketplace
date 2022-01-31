import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PagoPorOrden } from "../clases/pagoPorOrden";
import { OrdenCompra } from "../clases/ordenCompra";

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

  obtenerPagoPorIdOrden(orden : OrdenCompra) {
    return this.http.post<any>(this.URL + `/traerPagoPorIdOrden/${orden.id_orden_compra}`, orden);
  }


  
}
