import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, UsuarioTienda } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seccion-usuario-administrador',
  templateUrl: './seccion-usuario-administrador.component.html',
  styleUrls: ['./seccion-usuario-administrador.component.css']
})
export class SeccionUsuarioAdministradorComponent implements OnInit {
  @Input() objetoUsuario: Usuario = new Usuario();
  mostrarLoading=false
  mensajeLoading=""
  usuarioNuevo : Usuario = new Usuario()

  seccionListaUsuarios = true;
  seccionNuevoUsuario = false;

  listaUsuariosAdministradores : Usuario []=[]
  listaUsuariosclientes : Usuario []=[]
  listaUsuariospropietarios : UsuarioTienda []=[]
  usuarios: Usuario[] = []; 

  idEstadoTienda = 0;
  tituloPopup = ""
  textoPopup = ""



  constructor( public router : Router,
    public _usuarioService : UsuarioService) { }

  ngOnInit( ): void {
    console.log(this.objetoUsuario.cedula + "este es usuario producto");
   // this.traerListadoUsuarios()
   this.traerListadoUsuariosclientes()

  }

  mostrarSecProducto(numero : number){
    if(numero == 1) {
      this.seccionListaUsuarios = true;
      this.seccionNuevoUsuario = false;
      this.traerListadoUsuariosclientes()
    }  
    else if(numero == 2){
      this.seccionListaUsuarios = false;
      this.seccionNuevoUsuario = true;
      this.traerListadoUsuariospropietariosdenegocios()
    }
  }

  traerListadoUsuarios(){
    this._usuarioService.listarUsuariosAdministradores().subscribe(
      (res) => { this.listaUsuariosAdministradores = res as Usuario[]
      
      },
      (err) => {  this.mostrarLoading = false; Swal.fire('error')}
    ) 
  }
  traerListadoUsuariosclientes(){
    this._usuarioService.listarUsuariosclientes().subscribe(
      (res) => { this.listaUsuariosclientes = res as Usuario[]
        this.listaUsuariosclientes.forEach(function (element){
          var ced= new String(element.cedula) 
          if(ced.length ==9){
           element.cedula="0"+element.cedula
         }
          var cantidad= new String(element.celular) 
          console.log(cantidad.length)
          if(cantidad.length ==9){
            element.celular="0"+element.celular
          } 

          
          
        })
  
      
      },
      (err) => {  this.mostrarLoading = false; Swal.fire('error')}
    ) 
  }
  traerListadoUsuariospropietariosdenegocios(){
    this._usuarioService.listarUsuariosPropietarios().subscribe(
      (res) => { this. listaUsuariospropietarios = res as UsuarioTienda[]
        this.listaUsuariospropietarios.forEach(function (element){
          var ced= new String(element.cedula) 
          if(ced.length ==9){
           element.cedula="0"+element.cedula
         }
          var cantidad= new String(element.celular) 
          console.log(cantidad.length)
          if(cantidad.length ==9){
            element.celular="0"+element.celular
          } 

          
          
        })
      },
      (err) => {  this.mostrarLoading = false; Swal.fire('error')}
    ) 
  }

  registrar(){
    this.mensajeLoading = "Guardando Usuario";
    this.mostrarLoading = true;
    this.usuarioNuevo.id_tipo_usuario = 3 ;//Defecto usuario administrador
    this.usuarioNuevo.id_cantones = 1;
     this._usuarioService.registrar(this.usuarioNuevo).subscribe(
      (res) => {
        this.mostrarLoading = false;
        this.mostrarSecProducto(1);
        this.traerListadoUsuarios();
        this.usuarioNuevo = new Usuario();
        Swal.fire("Usuario creado","Su nuevo usuario Administrador ha sido creado","success")
      },
      (err) => {  this.mostrarLoading = false; Swal.fire('error')}
    ) 

  }



}
