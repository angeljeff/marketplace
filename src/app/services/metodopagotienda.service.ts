import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Met_pag_tienda } from "../clases/metodopagotienda";

@Injectable({
  providedIn: "root",
})
export class MetodopagotiendaService{

  private URL = 'http://localhost:3000/metodopagotienda';

  constructor(private http: HttpClient, private router: Router) {}

  agregarmetodopagotienda(metpagtienda : Met_pag_tienda) {
    return this.http.post<any>(this.URL + `/Agregar`, metpagtienda);
  }

  

  

  
}
