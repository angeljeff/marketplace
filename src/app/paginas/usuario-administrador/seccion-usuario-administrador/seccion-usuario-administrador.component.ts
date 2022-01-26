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

 
usuarios: Usuario[] = [{
    cedula:"224242",
    nombres: "Yander",
    apellidos: "Santana",
    direccion:"string",
    fecha_nacimiento: new Date(),
    id_cantones: 1,
    celular: "string",
    genero:"string",
    correo: "string", 
    contrasenia: "string",
    id_tipo_usuario: 1
}, {
  cedula:"224242",
    nombres: "Yander",
    apellidos: "Santana",
    direccion:"string",
    fecha_nacimiento: new Date(),
    id_cantones: 1,
    celular: "string",
    genero:"string",
    correo: "string", 
    contrasenia: "string",
    id_tipo_usuario: 1
}]; 

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
    this.listaUsuariosAdministradores = this.usuarios
  }

  registrar(){
    this.mensajeLoading = "Guardando Usuario";
    this.mostrarLoading = true;
    this.usuarioNuevo.id_tipo_usuario = 1;//Defecto usuario administrador
    console.log(this.usuarioNuevo)
     this._usuarioService.registrar(this.usuarioNuevo).subscribe(
      (res) => {
        this.mostrarLoading = false;
        Swal.fire("Usuario creado","Su nuevo usuario Administrador ha sido creado","success")
      },
      (err) => {  this.mostrarLoading = false; Swal.fire('error')}
    ) 

  }



}
