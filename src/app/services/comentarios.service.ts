import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Comentarios } from "../clases/Comentarios";

@Injectable({
  providedIn: "root",
})
export class ComentariosTiendaService{
  private URL = "http://137.184.0.8:3000/comentario";
 // private URL = 'http://localhost:3000/comentario';

  constructor(private http: HttpClient) {}

  registrar_comentarios(comentario : Comentarios) {
    return this.http.post<any>(this.URL + "/Agregar", comentario);
  }

  traer_comentarios() {
    return this.http.get<any>(this.URL + "/listar");
  }

  traer_comentarios_xtienda(comentario:Comentarios) {
    return this.http.post<any>(this.URL + `/obtener/${Number(comentario.id_tienda)}`,comentario);
  }


/*   obtenerPagoPorIdOrden(orden : OrdenCompra) {
    return this.http.post<any>(this.URL + `/traerPagoPorIdOrden/${orden.id_orden_compra}`, orden);
  }

  actualizarPagoporIdOrden(pago : PagoPorOrden ) {
    return this.http.put<any>(this.URL + `/actualizarpago/${pago.id_orden_compra}`, pago);
  } */


  
}
