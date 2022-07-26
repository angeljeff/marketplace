import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Producto } from "../clases/producto";

@Injectable({
  providedIn: "root",
})
export class ProductoService{
  private URL = "http://137.184.0.8:3000/producto";

 // private URL = 'http://localhost:3000/producto';

  constructor(private http: HttpClient, private router: Router) {}

  registrar(producto : Producto) {
    return this.http.post<any>(this.URL + "/Agregar", producto);
  }

  obtener_productos(producto : Producto) {
    return this.http.post<any>(this.URL + `/obtenerpro/${producto.id_tienda}`, producto);
  }
  obtener_codigo_productos(producto : Producto) {
    return this.http.post<any>(this.URL + `/obtenercodigo/${producto.id_tienda}`, producto);
  }

  obtener_todos_productos_activos() {
    return this.http.get<any>(this.URL + `/listarProActivos`);
  }

  listarProductos() {
    return this.http.get<any>(this.URL + `/listar`);
  }

  obtener_productosporid(producto : Producto) {
    return this.http.post<any>(this.URL + `/obtener/${Number(producto.id_producto)}`, producto);
  }

  obtener_porid_subcategorias(producto : Producto) {
    return this.http.post<any>(this.URL + `/obtenerporidsub/${producto.id_sub_categoria}`, producto);
  }

  actualizar(producto : Producto) {
    return this.http.put<any>(this.URL + `/actualizar/${Number(producto.id_producto)}`, producto);
  }

  actualizarContador(producto : Producto) {
    return this.http.put<any>(this.URL + `/contador/${Number(producto.id_producto)}`, producto);
  }

  actualizarStock(producto : Producto) {
    return this.http.put<any>(this.URL + `/updateStock/${Number(producto.id_producto)}`, producto);
  }

  actualizarEstado(producto : Producto) {
    return this.http.put<any>(this.URL + `/actualizarEstado/${Number(producto.id_producto)}`, producto);
  }
  
  eliminarproduct(producto : Producto) {
    return this.http.put<any>(this.URL + `/eliminar/${Number(producto.id_producto)}`, producto);
  }
}
