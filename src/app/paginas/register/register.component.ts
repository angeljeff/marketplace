import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Canton } from 'src/app/clases/canton';
import { TipoUsuario } from 'src/app/clases/tipoUsuario';
import { Usuario } from 'src/app/clases/usuario';
import { CantonService } from 'src/app/services/cantones.service';
import { TipoUsuarioService } from 'src/app/services/tipoUsuario.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuarioNuevo : Usuario = new Usuario();
  isedicion = false;
  cedulaRecibida = 0;
  listaCantones : Canton []=[]
  tiposUsuarios : TipoUsuario []=[]
 // fecha : Date = new Date();
  fecha: Date = new Date(Date.now());
  ff =""
  mostrarLoading = true;

  
  generos:string[]= ["Maculino", "Femenino"]

  constructor(public _usuarioService : UsuarioService,
    public _cantonesService : CantonService,
    public router : Router,
    public _tipoUsuarioService : TipoUsuarioService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.traerListadoCantones();
    this.traerListadoTiposUsuarios();

    this.route.queryParams.subscribe(params => {
      this.cedulaRecibida = params['id'] || 0;
    });

    /* if(this.cedulaRecibida != 0)
      this.isedicion = true;

      console.log(this.cedulaRecibida);
      this.usuarioNuevo.cedula = this.cedulaRecibida */
  }

  traerListadoCantones(){
    this._cantonesService.traerListaCantones().subscribe(
      (res) => { this.listaCantones = res as Canton[];},
      (err) => { }
    )
  }

  traerListadoTiposUsuarios(){
    this._tipoUsuarioService.traerListado().subscribe(
      (res) => { var lista = res as TipoUsuario[];
                  this.llenarArregloTiposUsuario(lista)},
      (err) => { }
    )
  }

  llenarArregloTiposUsuario(lista : TipoUsuario[]){
    lista.forEach(element=>{
      if(element.id_tipo_usuario != 3)
        this.tiposUsuarios.push(element)
    })
  }

  registrar(){
   // this.usuarioNuevo.cedula = this.usuarioNuevo.cedula

   this.usuarioNuevo.fecha_nacimiento = this.fecha;
   console.log(this.fecha)
    /* this._usuarioService.registrar(this.usuarioNuevo).subscribe(
      (res) => {
        Swal.fire({
          title: 'Usuario creado',
          text: "Ya puedo logearse",
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(["/login"]);
          }
        }) 
      
      },
      (err) => { 
        Swal.fire('error')
      }
    ) */

  }

  setearValorCanton(e:any){ 
    console.log(e.value)
    this.usuarioNuevo.id_cantones = e.value.id_cantones
    console.log(this.usuarioNuevo)
  }

  setearValorGenero(e:any){ 
    this.usuarioNuevo.genero = e.value
  }

  setearValorTipoUsuario(e:any){ 
    this.usuarioNuevo.id_tipo_usuario = e.value.id_tipo_usuario
  }

}
