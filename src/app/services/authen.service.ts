import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Usuario } from "../clases/usuario";

@Injectable({
  providedIn: "root",
})
export class AuthenService{
  userEmail = 0;
  userLogin: any;
  usuario: Usuario = new Usuario();
  usuarios: Usuario[] = [];
  usuarios2: Usuario[] = [];
  estalogeado: boolean = true;

  //private URL = "http://159.223.107.115:3000/usuario";
  private URL = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient, private router: Router) {}

  signup(usuario : Usuario) {
    return this.http.post<any>(this.URL + "/register", usuario);
  }

  signIn(usuario : Usuario) {
    this.userEmail = usuario.cedula ?? 0;
    localStorage.setItem("maily", (this.userEmail.toString()));
    return this.http.post<any>(this.URL + "/login", Usuario);
  }

  loggedIn() {
    //comprobar si el usuario esta logeado
    return !!localStorage.getItem("token");
  }

  returnUserRol() {
    const pr = localStorage.getItem("maily");
    return this.http.get(this.URL + `/getUsers1/${pr}`);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("contrasena");
    this.router.navigate(["/login"]);
  }

  getUsers() {
    return this.http.get(this.URL + "/getUsers");
  }

  getUserLogueado(correo: string) {
    return this.http.get(this.URL + `/getUsers1/${correo}`);
  }
}
