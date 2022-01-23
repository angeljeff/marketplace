import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Producto } from "../clases/producto";

@Injectable({
  providedIn: "root",
})
export class ProductocompletoService{
  //private URL = "http://159.223.107.115:3000/usuario";
  private URL = 'http://localhost:3000/producto';

  constructor(private http: HttpClient, private router: Router) {}

  traerpro_completos() {
    return this.http.get<any>(this.URL + "/listarProcompletos");
  }
  obtener_productosporidsub(producto : Producto) {
    return this.http.post<any>(this.URL + `/listarporsub/${producto.id_sub_categoria}`, producto);
  }

  

  

  
}
