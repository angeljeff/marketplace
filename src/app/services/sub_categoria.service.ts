import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subcategorias } from "../clases/subcategorias";

@Injectable({
  providedIn: "root",
})
export class SubCategoriaService{
  //private URL = "http://159.223.107.115:3000/usuario";
  private URL = "http://137.184.0.8:3000/SubCategoria";

 // private URL = 'http://localhost:3000/SubCategoria';

  constructor(private http: HttpClient, private router: Router) {}

  traerListaSubcategorias() {
    return this.http.get<any>(this.URL + "/listar");
  }

  traerListaSubcategoriasporidcat(categoria: Subcategorias) {
    return this.http.post<any>(this.URL + `/obtenerporcat/${categoria.id_categoria}`, categoria);
  }

  
}
