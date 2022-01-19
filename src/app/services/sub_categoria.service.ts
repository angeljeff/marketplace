import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class SubCategoriaService{
  //private URL = "http://159.223.107.115:3000/usuario";
  private URL = 'http://localhost:3000/SubCategoria';

  constructor(private http: HttpClient, private router: Router) {}

  traerListaSubcategorias() {
    return this.http.get<any>(this.URL + "/listar");
  }

  
}
