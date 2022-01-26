import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Tienda } from "../clases/tienda";

@Injectable({
  providedIn: "root",
})
export class TiendaService{
  private URL = 'http://192.168.100.251:3000/tienda';
  //private URL = 'http://localhost:3000/tienda';

  constructor(private http: HttpClient) {}

  registrar(tienda : Tienda) {
    return this.http.post<any>(this.URL + "/Agregar", tienda);
  }

  obtener_datos_tienda(tienda : Tienda) {
    return this.http.post<any>(this.URL + `/obtenertienda/${tienda.cedula}`, tienda);
  }

  obtener_datos_tienda_porid(tienda : Tienda) {
    return this.http.post<any>(this.URL + `/obtener/${Number(tienda.id_tienda)}`, tienda);
  }

  activar_tienda(tienda : Tienda) {
    return this.http.put<any>(this.URL + `/activar/${Number(tienda.id_tienda)}`, tienda);
  }

  elminar_tienda(tienda : Tienda) {
    return this.http.put<any>(this.URL + `/eliminar/${Number(tienda.id_tienda)}`, tienda);
  }
 
  actualizar(tienda : Tienda) {
    return this.http.put<any>(this.URL + `/actualizar/${Number(tienda.id_tienda)}`, tienda);
  }

  traerListaTiendas() {
    return this.http.get<any>(this.URL + "/listar");
  }
  
}
