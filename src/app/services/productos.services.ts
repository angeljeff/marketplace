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
    return this.http.post<any>(this.URL + `/obtenerpro/${producto.id_tienda}`, producto);
  }

  
}
