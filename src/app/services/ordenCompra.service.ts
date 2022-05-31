import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { OrdenCompra } from "../clases/ordenCompra";
import { Tienda } from "../clases/tienda";

@Injectable({
  providedIn: "root",
})
export class OrdenCompraService{
  private URL = "http://67.207.92.81:3000/ordencompra";
  //private URL = 'http://localhost:3000/ordencompra';

  constructor(private http: HttpClient) {}

  registrar(orden : OrdenCompra) {
    return this.http.post<any>(this.URL + "/agregar", orden);
  }

  traerOrdenPorUsuario(orden : OrdenCompra ) {
    return this.http.post<any>(this.URL + `/traerOrdenUsuario/${orden.cedula}`, orden);
  }

  traerOrdenPorUsuarioDTO(orden : OrdenCompra ) {
    return this.http.post<any>(this.URL + `/traerOrdenUsuarioDTO/${orden.cedula}`, orden);
  }

  obtenerOrdenesPorTienda(tienda : Tienda ) {
    return this.http.post<any>(this.URL + `/obtenerOrdenesPorTienda/${tienda.id_tienda}`, tienda);
  }

  actualizarOrden(orden : OrdenCompra ) {
    return this.http.put<any>(this.URL + `/actualizar/${orden.id_orden_compra}`, orden);
  }

  actualizarEstadoOrden(orden : OrdenCompra ) {
    return this.http.put<any>(this.URL + `/actualizarEstado/${orden.id_orden_compra}`, orden);
  }

  
}
