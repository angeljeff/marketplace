import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Correo } from 'src/app/clases/Correo';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { CorreoService } from 'src/app/services/correoServices';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

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
  nombreUsuario = "Yander"
  passwordMode: string;
  passwordButton: any;
  recuperarcont=false;
  Usuario: Usuario = new Usuario();
  usuario_recuperacion: Usuario = new Usuario();
  correo: Correo = new Correo();
  mostrarLoading = false;
  mensajeLoading = "";

  

  constructor( private authService: AuthService,
    public _usuarioService: UsuarioService,
    public _correoService: CorreoService,
    public router: Router) { 
    this.passwordMode = 'password';
    this.passwordButton = {
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7klEQVRYw+2YP0tcQRTFz65xFVJZpBBS2O2qVSrRUkwqYfUDpBbWQu3ELt/HLRQ/Q8RCGxVJrRDEwj9sTATxZ/Hugo4zL/NmV1xhD9xi59177pl9986fVwLUSyi/tYC+oL6gbuNDYtyUpLqkaUmfJY3a+G9JZ5J2JW1J2ivMDBSxeWCfeBxYTHSOWMcRYLOAEBebxtEVQWPASQdi2jgxro4E1YDTQIJjYM18hszGbew4EHNq/kmCvgDnHtI7YBko58SWgSXg1hN/btyFBM0AlwExczG1YDZrMS4uLUeUoDmgFfjLGwXEtG05wNXyTc4NXgzMCOAIGHD8q0ATuDZrempkwGJ9+AfUQ4K+A/eEseqZ/UbgdUw4fqs5vPeW+5mgBvBAPkLd8cPju+341P7D/WAaJGCdOFQI14kr6o/zvBKZYz11L5Okv5KGA89Kzu9K0b0s5ZXt5PjuOL6TRV5ZalFP4F+rrnhZ1Cs5vN6ijmn7Q162/ThZq9+YNW3MbfvDAOed5cxdGL+RFaUPKQtjI8DVAr66/u9i6+jJzTXm+HFEVqxVYBD4SNZNKzk109HxoycPaG0bIeugVDTp4hH2qdXJDu6xOAAWiuQoQdLHhvY1aEZSVdInG7+Q9EvSz9RrUKqgV0PP3Vz7gvqCOsUj+CxC9LB1Dc8AAAASdEVYdEVYSUY6T3JpZW50YXRpb24AMYRY7O8AAAAASUVORK5CYII=',
      type: 'default',
      onClick: () => {
        this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
      },
    };
  }
   
  

  ngOnInit(): void {
    
  }

  mostrarFormularioRegistro(){
    this.mostrarRegistro = true;
    this.mostrarLogin = true;
  }

  redirigir(){
    this.router.navigate(["/principal"]);
  }

  signIn() {

    this.recuperarcont=false;
    this.authService.logIn(Number(this.user), this.password);
    this.Usuario.cedula= this.user;
    this._usuarioService.obtenerDatoCedula(this.Usuario).subscribe(
      (res) => { 
        if (res[0].cedula != ""){
          this.usuario_recuperacion=res[0];
          this.recuperarcont=true;
        }
        
        //this.nombreCanton = this.listaCantones.find(element => element.id_cantones == this.usuarioNuevo.id_cantones)?.descripcion ?? "" ;
 
      },
      (err) => { }
    )
  }


  recuperar_contrasena(){
    Swal.fire({
      title: 'Recuperación contraseña',
      
      text: "Se le enviará a su correo electrónico "+this.usuario_recuperacion.correo+" la nueva contraseña",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText :'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.recuperar_contrasena_correo();
      }
    }) 

  }
  recuperar_contrasena_correo(){
    this.mensajeLoading = "Enviando correo";
    this.mostrarLoading = true;
    var nombre="Agromarketplace";
    const signos = ["*", "/", "+"];
    const signo_aleatorio = signos[Math.floor(Math.random() * signos.length)];
    var min = Math.ceil(10000);
    var max = Math.floor(99999);
    var aleatorio=  Math.floor(Math.random() * (max - min + 1)) + min; 
    var contraseniafinal=nombre+aleatorio+this.usuario_recuperacion.nombres+signo_aleatorio
    this.correo.email=this.usuario_recuperacion.correo;
    this.correo.asunto="Recuperación de contraseña";
    this.correo.mensaje=contraseniafinal;
    this._correoService.enviar_correo_contrasenia(this.correo).subscribe(
      (res) => { console.log("estoy en la respuesta"+res);
      this.usuario_recuperacion.contrasenia=this.correo.mensaje;
      this.actualizar_contrasenia();
      this.mostrarLoading = false;
      
         
        
      },
      (err) => {  Swal.fire("Error","No se pudo actualizar su contraseña","error")})

    }

  actualizar_contrasenia(){
    this._usuarioService.actualizar_contrasenia(this.usuario_recuperacion).subscribe(
      (res) => {this.recuperarcont=false;
        this.usuario_recuperacion= new Usuario();
        this.user="";
        this.password="";
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Su contraseña ha sido enviada a su correo electrónico',
          showConfirmButton: false,
          timer: 1500
        })
        },
        
      (err) => {  Swal.fire("Error","No se pudo actualizar usuario","error")})

  }



 

}
