import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Producto } from "../clases/producto";

@Injectable({
  providedIn: "root",
})
export class ProductocompletoService{
  //private URL = 'http://192.168.100.251:3000/producto';
  private URL = 'http://localhost:3000/producto';

  constructor(private http: HttpClient) {}

  traerpro_completos() {
    return this.http.get<any>(this.URL + "/listarProcompletos");
  }


  obtener_productosporidsub(producto : Producto) {
    return this.http.post<any>(this.URL + `/listarporsub/${producto.id_sub_categoria}`, producto);
  }

  

  

  
}
