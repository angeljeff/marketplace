import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class BancoService{
  private URL = 'http://67.207.92.81:3000/bancos';
 // private URL = 'http://localhost:3000/bancos';

  constructor(private http: HttpClient, private router: Router) {}

  traerListaBancos() {
    return this.http.get<any>(this.URL + "/listar");
  }

  
}
