import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { UserLogin, Usuario } from "../clases/usuario";

@Injectable({
  providedIn: "root",
})
export class AuthenService{
  cedula = "";
  userLogin: any;
  usuario: Usuario = new Usuario();
  usuarios: Usuario[] = [];
  usuarios2: Usuario[] = [];
  estalogeado: boolean = true;

  //private URL = "http://137.184.0.8:3000/usuario";
  private URL = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient, private router: Router) {}

  signup(usuario : Usuario) {
    return this.http.post<any>(this.URL + "/register", usuario);
  }

  signIn(usuario : UserLogin) {
    this.cedula = usuario.cedula.toString() ?? "";
    //localStorage.setItem("cedulaUser", (this.cedula.toString()));
    return this.http.post<any>(this.URL + "/login", usuario);
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

  getUserLogueado(cedula: string) {
    var user = new Usuario()
    user.cedula = cedula
    return this.http.post(this.URL + `/obtener/${cedula}`,user);
  }
}
