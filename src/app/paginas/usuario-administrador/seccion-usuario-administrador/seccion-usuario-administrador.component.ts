import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
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
  usuarios: Usuario[] = []; 

  idEstadoTienda = 0;
  tituloPopup = ""
  textoPopup = ""



  constructor( public router : Router,
    public _usuarioService : UsuarioService) { }

  ngOnInit( ): void {
    console.log(this.objetoUsuario.cedula + "este es usuario producto");
    this.traerListadoUsuarios()

  }

  mostrarSecProducto(numero : number){
    if(numero == 1) {
      this.seccionListaUsuarios = true;
      this.seccionNuevoUsuario = false;
    }  
    else if(numero == 2){
      this.seccionListaUsuarios = false;
      this.seccionNuevoUsuario = true;
    }
  }

  traerListadoUsuarios(){
    this._usuarioService.listarUsuariosAdministradores().subscribe(
      (res) => { this.listaUsuariosAdministradores = res as Usuario[]},
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
