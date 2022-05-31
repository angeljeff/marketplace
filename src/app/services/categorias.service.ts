import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class CategoriaService{
  private URL = "http://67.207.92.81:3000/Categoria";
  //private URL = 'http://localhost:3000/Categoria';

  constructor(private http: HttpClient, private router: Router) {}

  traerListaCtegorias() {
    return this.http.get<any>(this.URL + "/listar");
  }

  
}
