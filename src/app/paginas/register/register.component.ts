import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Canton } from 'src/app/clases/canton';
import { Producto } from 'src/app/clases/producto';
import { TipoUsuario } from 'src/app/clases/tipoUsuario';
import { Usuario } from 'src/app/clases/usuario';
import { AuthenService } from 'src/app/services/authen.service';
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
  fecha: any;
  ff =""
  mostrarLoading = false;
  mensajeLoading = "";
  nombreCanton = "";
  password=""
  passwordMode: string;
  comprobarcedula: any;
  comprobarfecha:Date = new Date();
  passwordButton: any;
  isLoged = false;
  nombreUsuario = ""
  usuarioLogueado : Usuario = new Usuario();

  
  generos:string[]= ["Maculino", "Femenino"]

  constructor(public _usuarioService : UsuarioService,
    public _cantonesService : CantonService,
    public router : Router,
    public _tipoUsuarioService : TipoUsuarioService,
    private route: ActivatedRoute,
    private authenService: AuthenService) {
    this.passwordMode = 'password';
    this.passwordButton = {
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7klEQVRYw+2YP0tcQRTFz65xFVJZpBBS2O2qVSrRUkwqYfUDpBbWQu3ELt/HLRQ/Q8RCGxVJrRDEwj9sTATxZ/Hugo4zL/NmV1xhD9xi59177pl9986fVwLUSyi/tYC+oL6gbuNDYtyUpLqkaUmfJY3a+G9JZ5J2JW1J2ivMDBSxeWCfeBxYTHSOWMcRYLOAEBebxtEVQWPASQdi2jgxro4E1YDTQIJjYM18hszGbew4EHNq/kmCvgDnHtI7YBko58SWgSXg1hN/btyFBM0AlwExczG1YDZrMS4uLUeUoDmgFfjLGwXEtG05wNXyTc4NXgzMCOAIGHD8q0ATuDZrempkwGJ9+AfUQ4K+A/eEseqZ/UbgdUw4fqs5vPeW+5mgBvBAPkLd8cPju+341P7D/WAaJGCdOFQI14kr6o/zvBKZYz11L5Okv5KGA89Kzu9K0b0s5ZXt5PjuOL6TRV5ZalFP4F+rrnhZ1Cs5vN6ijmn7Q162/ThZq9+YNW3MbfvDAOed5cxdGL+RFaUPKQtjI8DVAr66/u9i6+jJzTXm+HFEVqxVYBD4SNZNKzk109HxoycPaG0bIeugVDTp4hH2qdXJDu6xOAAWiuQoQdLHhvY1aEZSVdInG7+Q9EvSz9RrUKqgV0PP3Vz7gvqCOsUj+CxC9LB1Dc8AAAASdEVYdEVYSUY6T3JpZW50YXRpb24AMYRY7O8AAAAASUVORK5CYII=',
      type: 'default',
      onClick: () => {
        this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
      },
    }; }

  ngOnInit(): void {
    this.traerListadoCantones();
    this.traerListadoTiposUsuarios();
    this.cargarUsuarioLogueado()
     /* this.obtenerDatosPorCedula("0930492731") */
    

    this.route.queryParams.subscribe(params => {
      this.cedulaRecibida = params['id'] || 0;
    });

     if(this.cedulaRecibida != 0){
      this.isedicion = true;
       this.obtenerDatosPorCedula(this.cedulaRecibida.toString());
     }
      
  }

  obtenerDatosPorCedula(cedula : string){
    var usuarioBuscado = new Usuario();
    usuarioBuscado.cedula = cedula;
    this._usuarioService.obtenerDatoCedula(usuarioBuscado).subscribe(
      (res) => {
        this.usuarioNuevo = res[0];
        this.fecha = this.usuarioNuevo.fecha_nacimiento;
        console.log(this.usuarioNuevo.id_tipo_usuario)
        //this.nombreCanton = this.listaCantones.find(element => element.id_cantones == this.usuarioNuevo.id_cantones)?.descripcion ?? "" ;
        console.log(this.nombreCanton)
      },
      (err) => { }
    )
  }

  obtenerDatos(cedula : string){
    this._usuarioService.obtenerDatoCedula(this.usuarioNuevo).subscribe(
      (res) => {
        if (res.length > 0){
          console.log("esta es la longitud" + res.length)
          this.mostrarmensajes("Este usuario ya se encuentra registrado")
        }else{
          if(!this.isedicion){
            this.registrar()
            }else{
               this.actualizar()
              } 
        }
      },
      (err) => { }
    )
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
    this.mensajeLoading = "Guardando Usuario";
    this.mostrarLoading = true;
    this.usuarioNuevo.fecha_nacimiento = this.fecha;
    console.log(this.usuarioNuevo)
     this._usuarioService.registrar(this.usuarioNuevo).subscribe(
      (res) => {
        this.mostrarLoading = false;
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
      (err) => {  this.mostrarLoading = false; Swal.fire('error')}
    ) 

  }
/*   passwordComparison =()=> this.password; */
  actualizar(){
    this.mensajeLoading = "Actualizando Usuario";
    this.mostrarLoading = true;
    this.usuarioNuevo.fecha_nacimiento = this.fecha;
    console.log(this.usuarioNuevo)
     this._usuarioService.actualizar(this.usuarioNuevo).subscribe(
      (res) => {
        this.mostrarLoading = false;
        Swal.fire({
          title: 'Usuario Actualizado',
          text: "Sus datos fueron actualizados",
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            if(this.usuarioNuevo.id_tipo_usuario== 1){
              this.router.navigate(["/usuarioVendedor"])
            }else{
              this.router.navigate(["/login"])
            }
            
            //this.router.navigate(["/login"]);
          }
        }) 
      
      },
      (err) => {  this.mostrarLoading = false; Swal.fire('error')}
    ) 

  }
  cargarUsuarioLogueado() {
    new Promise((res, err) => {
      var cedula = localStorage.getItem("cedulaUser") ?? "";
      this.authenService.getUserLogueado(cedula)
        .subscribe(
          res => {
            var arreglo = res as Usuario[];
            this.isLoged = true;
            this.usuarioLogueado = arreglo[0];
            var array = this.usuarioLogueado.nombres.split(" ");
            this.nombreUsuario = array[0];
            
          },
          err => {})
    });
  }

  irPerfilUsuario(){
    this.usuarioLogueado.id_tipo_usuario =2;
    if(this.usuarioLogueado.id_tipo_usuario == 1)
      this.router.navigate(['/usuarioComprador']);
    else if(this.usuarioLogueado.id_tipo_usuario == 2)
      this.router.navigate(['/usuarioVendedor']);
  }
  logout() {
    localStorage.removeItem("cedulaUser");
    localStorage.removeItem("token");
    localStorage.removeItem("logged");
    this.router.navigate(["/login"]);
  }

  redirigir(){
    this.router.navigate(["/principal"]);
  }
  setearValorCanton(e:any){ 
    console.log(e.value)
    //this.usuarioNuevo.id_cantones = e.value.id_cantones
    console.log(this.usuarioNuevo)
  }

  setearValorGenero(e:any){ 
    this.usuarioNuevo.genero = e.value
  }

  setearValorTipoUsuario(e:any){ 
    this.usuarioNuevo.id_tipo_usuario = e.value.id_tipo_usuario
  }
  /* constedulaUsvuario = this.validarCedula("0930482731"); */

  verificarcampos(){
    if(this.usuarioNuevo.nombres !==""){
      if(this.usuarioNuevo.apellidos!==""){
        if(this.usuarioNuevo.cedula!=="" && this.usuarioNuevo.cedula.length === 10){
          if(this.usuarioNuevo.direccion!=="" /* && this.productonuevo.precio!==null */){
            if(this.usuarioNuevo.genero!=="" /* && this.productonuevo.stock!==null */){
              this.usuarioNuevo.fecha_nacimiento = this.fecha
              console.log(this.usuarioNuevo.fecha_nacimiento + "esta es la fecha")
              /* console.log(this.usuarioNuevo.fecha_nacimiento.getUTCFullYear() + 10 +"esta es el avo") */
              if(this.usuarioNuevo.id_cantones !== 0){
                if(this.usuarioNuevo.id_tipo_usuario !== 0){
                  if(this.usuarioNuevo.celular !=="" && this.usuarioNuevo.celular.length === 10){
                    if(this.usuarioNuevo.correo !==""){
                      if(this.usuarioNuevo.contrasenia!=="" && this.usuarioNuevo.contrasenia.length >= 8 ){
                        this.comprobarcedula = this.validarCedula(this.usuarioNuevo.cedula);
                        if(this.comprobarcedula=== true){
                          if(this.usuarioNuevo.fecha_nacimiento !== undefined){
                            if(2022 - (this.usuarioNuevo.fecha_nacimiento.getUTCFullYear() )>=18){
                               this.obtenerDatos(this.usuarioNuevo.cedula)
                               /* if(!this.isedicion){
                                  this.registrar()
                                  }else{
                                     this.actualizar()
                                    }  */
                            }else{
                              this.mostrarmensajes('debe ser mayor de edad para poder registrarse')
                            }
                          }else{
                            this.mostrarmensajes('Indique su fecha de nacimiento')
                          }
                          

                        }else{
                          this.mostrarmensajes('Indique un numero de cedula correcto')
                          
                        }
                        

                      }else{
                        this.mostrarmensajes('Indique una contraseña segura')

                      }

                    }else{
                      this.mostrarmensajes('Por favor indique su correo electrónico')
                    }

                  }else{
                    this.mostrarmensajes('Por favor indique su numero celular')
                  }


                }else{
                  this.mostrarmensajes('Por favor indique el rol')
                }
                  
  
              }else{
            this.mostrarmensajes('Por favor seleccione su cantón')
          }
  
            }else{
          this.mostrarmensajes('Por favor indique su género')
        }
  
          }else{
        this.mostrarmensajes('Por favor indique su direccion')
      }
  
        }else{
        this.mostrarmensajes('Debe indicar su numero de cedula')
      }
  
      }else{
        this.mostrarmensajes('Debe indicar sus apellidos')
      }
      
    }
    else {
      this.mostrarmensajes('Debe llenar el campo nombres')
    }
  }
  verificarcamposparaactualizar(){
    if(this.usuarioNuevo.direccion !==""){
      if(this.usuarioNuevo.celular !=="" && this.usuarioNuevo.celular.length === 10){
        if(this.usuarioNuevo.correo !==""){
          if(this.usuarioNuevo.contrasenia!=="" && this.usuarioNuevo.contrasenia.length >= 8){
            this.actualizar()
          
                               /* this.obtenerDatos(this.usuarioNuevo.cedula) */
                               /* if(!this.isedicion){
                                  this.registrar()
                                  }else{
                                     this.actualizar()
                                    }  */

          }else{
        this.mostrarmensajes('Por favor indique una contraseña más segura')
      }
  
        }else{
        this.mostrarmensajes('Debe indicar su correo electronico')
      }
  
      }else{
        this.mostrarmensajes('Debe registrar su numero celular')
      }
      
    }
    else {
      this.mostrarmensajes('Por favor indique su direccion')
    }
  }

  mostrarmensajes(texto: string){
    Swal.fire({
      title: texto,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  
  }
  
  
  validarCedula(cedula: string) {
    if (cedula.length === 10) {
      const digitoRegion = cedula.substring(0, 2);
      if (digitoRegion >= String(0) && digitoRegion <= String(24)) {
        const ultimoDigito = Number(cedula.substring(9, 10));
        const pares = Number(cedula.substring(1, 2)) + Number(cedula.substring(3, 4)) + Number(cedula.substring(5, 6)) + Number(cedula.substring(7, 8));
        let numeroUno: any = cedula.substring(0, 1);
        numeroUno = (numeroUno * 2);
        if (numeroUno > 9) {
          numeroUno = (numeroUno - 9);
        }
        let numeroTres: any = cedula.substring(2, 3);
        numeroTres = (numeroTres * 2);
        if (numeroTres > 9) {
          numeroTres = (numeroTres - 9);
        }
        let numeroCinco: any = cedula.substring(4, 5);
        numeroCinco = (numeroCinco * 2);
        if (numeroCinco > 9) {
          numeroCinco = (numeroCinco - 9);
        }
        let numeroSiete: any = cedula.substring(6, 7);
        numeroSiete = (numeroSiete * 2);
        if (numeroSiete > 9) {
          numeroSiete = (numeroSiete - 9);
        }
        let numeroNueve: any = cedula.substring(8, 9);
        numeroNueve = (numeroNueve * 2);
        if (numeroNueve > 9) {
          numeroNueve = (numeroNueve - 9);
        }
        const impares = numeroUno + numeroTres + numeroCinco + numeroSiete + numeroNueve;
        const sumaTotal = (pares + impares);
        const primerDigitoSuma = String(sumaTotal).substring(0, 1);
        const decena = (Number(primerDigitoSuma) + 1) * 10;
  
        let digitoValidador = decena - sumaTotal;
  
        if (digitoValidador === 10) {
          digitoValidador = 0;
        }
        if (digitoValidador === ultimoDigito) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  
  }

}
