import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mostrarRegistro: boolean = false;
  mostrarLogin: boolean = true;
  user = "";
  password= "";

  

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
    
  }

  mostrarFormularioRegistro(){
    console.log("ssddsd");
    this.mostrarRegistro = true;
    this.mostrarLogin = true;
  }

  signIn() {
    this.authService.logIn(Number(this.user), this.password);
  }

}
