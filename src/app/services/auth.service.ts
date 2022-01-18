import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Usuario } from '../clases/usuario';
import { AuthenService } from './authen.service';

@Injectable()
export class AuthService {
  user: Usuario= new Usuario();
  loggedIn:boolean;



  constructor(private router: Router,public authenService: AuthenService) {
    if(localStorage.getItem("logged") == undefined){
      localStorage.setItem("logged", false.toString())
    }
    this.loggedIn = JSON.parse(localStorage.getItem("logged") ?? "");
  }

  async logIn(cedula: number, password: string) {
    var user2 = new Usuario();
   // user2.cedula = cedula
    user2.contrasenia = password
    try{
        localStorage.setItem('tokenMarketplace', "11111");
        this.loggedIn = true;
        localStorage.setItem("loggedMarketplace", this.loggedIn.toString())
        
        this.router.navigate(['/usuarioVendedor']);

      /* this.authenService.signIn(user2).subscribe(
          res => {
            localStorage.setItem('token', res.token);
            this.loggedIn = true;
            localStorage.setItem("logged", this.loggedIn.toString())
            
            this.router.navigate(['/principal']);

          },
          error => { alert("Credenciales incorrectas") }
        ); */
     
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
