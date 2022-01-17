import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
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

  constructor(public _usuarioService : UsuarioService, public router : Router,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.cedulaRecibida = params['id'] || 0;
    });

    if(this.cedulaRecibida != 0)
      this.isedicion = true;

      console.log(this.cedulaRecibida);
      this.usuarioNuevo.cedula = this.cedulaRecibida
  }

  registrar(){
    console.log(this.usuarioNuevo)
    this._usuarioService.registrar(this.usuarioNuevo).subscribe(
      (res) => { 
        Swal.fire('Usuario creado')
      },
      (err) => { 
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
      }
    )

  }

}
