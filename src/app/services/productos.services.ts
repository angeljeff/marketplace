import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Producto } from "../clases/producto";

@Injectable({
  providedIn: "root",
})
export class ProductoService{
  //private URL = "http://159.223.107.115:3000/usuario";
  private URL = 'http://localhost:3000/producto';

  constructor(private http: HttpClient, private router: Router) {}

  registrar(producto : Producto) {
    return this.http.post<any>(this.URL + "/Agregar", producto);
  }

  obtener_productos(producto : Producto) {
    console.log(producto.id_tienda + "este es id")
    return this.http.post<any>(this.URL + `/obtenerpro/${producto.id_tienda}`, producto);
  }
  obtener_todos_productos_activos() {
    return this.http.get<any>(this.URL + `/listarProActivos/`);
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
  
  eliminarproduct(producto : Producto) {
    return this.http.put<any>(this.URL + `/eliminar/${Number(producto.id_producto)}`, producto);
  }
}
