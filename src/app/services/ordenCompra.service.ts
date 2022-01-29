import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { OrdenCompra } from "../clases/ordenCompra";

@Injectable({
  providedIn: "root",
})
export class OrdenCompraService{
  //private URL = "http://159.223.107.115:3000/ordencompra";
  private URL = 'http://localhost:3000/ordencompra';

  constructor(private http: HttpClient) {}

  registrar(orden : OrdenCompra) {
    return this.http.post<any>(this.URL + "/agregar", orden);
  }

  traerOrdenPorUsuario(orden : OrdenCompra ) {
    return this.http.post<any>(this.URL + `/traerOrdenUsuario/${orden.cedula}`, orden);
  }

  actualizarOrden(orden : OrdenCompra ) {
    return this.http.put<any>(this.URL + `/actualizar/${orden.id_orden_compra}`, orden);
  }

  
}
