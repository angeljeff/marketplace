import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import Swal from 'sweetalert2';
import { UserLogin, Usuario } from '../clases/usuario';
import { AuthenService } from './authen.service';
import { UsuarioService } from './usuario.service';

@Injectable()

export class AuthService {
  user: Usuario= new Usuario();
  loggedIn:boolean;
  ingresousuario: Usuario = new Usuario();
  usuario: Usuario = new Usuario();

 



  constructor(private router: Router,public authenService: AuthenService,
    public usuario_service: UsuarioService) {
    if(localStorage.getItem("logged") == undefined){
      localStorage.setItem("logged", false.toString())
    }
    this.loggedIn = JSON.parse(localStorage.getItem("logged") ?? "");
  }

  async logIn(cedula: number, password: string) {
    var login = new UserLogin();
    login.cedula = cedula
    login.contrasenia = password
    try{
      this.authenService.signIn(login).subscribe(
          res => {
            this.loggedIn = true;
            localStorage.setItem('token', res.token);
            localStorage.setItem("logged", this.loggedIn.toString())
            localStorage.setItem("cedulaUser", cedula.toString())
            this.ingresousuario.cedula = cedula.toString();
            this.usuario_service.obtenerDatoCedula(this.ingresousuario).subscribe(
              (res) => { this.usuario = res[0];
                if(this.usuario.id_tipo_usuario== 1){
                  this.router.navigate(['/usuarioVendedor']);

                }else if(this.usuario.id_tipo_usuario== 3){
                  this.router.navigate(['/usuarioAdministrador']);

                }else{
                  this.router.navigate(['/principal']);
                }
                
              },
              (err) => { }
            )

            

            

          },
          error => { 
            
            Swal.fire({
              title: "Usuario o contraseña Incorrecto",
              
              showClass: {popup: 'animate__animated animate__fadeInDown'},
              hideClass: {popup: 'animate__animated animate__fadeOutUp'}
            })
           }
        ); 
     
    }catch(e){
      
    }
    
  }


  async loginIn(){
    try{
      if("token" in localStorage)
        this.router.navigate(['/home']);
    }catch(e){}
  }

  async logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.loggedIn = false;
    localStorage.setItem("logged", this.loggedIn.toString())
    this.router.navigate(['/login-form']);
  }

  get isLoggedIn() {
    return this.loggedIn;
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private router: Router , private authService: AuthService, public authenService:AuthenService) {}
    canActivate(route: ActivatedRouteSnapshot): boolean {
        //const isLoggedIn = this.authService.isLoggedIn;
        const isLoggedIn = true;
        //console.log(isLoggedIn)
        //const isLoginForm = route.routeConfig.path === 'login-form';
        const isLoginForm = false;
        if (isLoggedIn && isLoginForm) {
            this.router.navigate(['/']);
            return false;
        }

        if (!isLoggedIn && !isLoginForm) {
            this.router.navigate(['/principal']);
        }

        return isLoggedIn || isLoginForm;
    }
}
