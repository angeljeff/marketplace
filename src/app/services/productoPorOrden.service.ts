import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProductosPorOrden, ProductosPorOrdenDTO } from "../clases/productosOrdenCompra";
import { OrdenCompra } from "../clases/ordenCompra";

@Injectable({
  providedIn: "root",
})
export class ProductoPorOrdenService{
  private URL = "http://137.184.0.8:3000/productosxorden";
 // private URL = 'http://localhost:3000/productosxorden';

  constructor(private http: HttpClient) {}

  registrar(producto : ProductosPorOrden) {
    return this.http.post<any>(this.URL + "/agregar", producto);
  }

  traerListadoPorOrden(orden : OrdenCompra ) {
    return this.http.post<any>(this.URL + `/obtenerPorIdOrdenDTO/${orden.id_orden_compra}`, orden);
  }

  actualizarProducto(producto : ProductosPorOrdenDTO ) {
    return this.http.put<any>(this.URL + `/actualizar/${producto.id_producto_orden}`, producto);
  }

  eliminarProducto(producto : ProductosPorOrdenDTO ) {
    return this.http.delete<any>(this.URL + `/eliminar/${producto.id_producto_orden}`);
  }

  
}
