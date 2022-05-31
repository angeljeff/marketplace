import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Met_pag_tienda } from "../clases/metodopagotienda";

@Injectable({
  providedIn: "root",
})
export class MetodopagotiendaService{
  private URL = "http://67.207.92.81:3000/metodopagotienda";
  //private URL = 'http://localhost:3000/metodopagotienda';

  constructor(private http: HttpClient, private router: Router) {}

  agregarmetodopagotienda(metpagtienda : Met_pag_tienda) {
    return this.http.post<any>(this.URL + `/Agregar`, metpagtienda);
  }
  consultarmetodopagotienda(metpagtienda : Met_pag_tienda) {
    return this.http.post<any>(this.URL + `/consultar/${metpagtienda.id_tienda}`, metpagtienda);
  }
  actualizarmetodopagotienda(metpagtienda : Met_pag_tienda) {
    return this.http.put<any>(this.URL + `/actualizar/${metpagtienda.id_metodo_pago_tienda}`, metpagtienda);
  }

  

  

  
}
