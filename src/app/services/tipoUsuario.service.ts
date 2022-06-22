import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class TipoUsuarioService{
 
  private URL = "http://137.184.0.8:3000/tipousuario";

  //private URL = 'http://localhost:3000/tipousuario';

  constructor(private http: HttpClient, private router: Router) {}

  traerListado() {
    return this.http.get<any>(this.URL + "/listar");
  }

  
}
