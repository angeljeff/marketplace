import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { event } from 'devextreme/events';
import { Canton } from 'src/app/clases/canton';
import { Tienda } from 'src/app/clases/tienda';
import { Usuario } from 'src/app/clases/usuario';
import { CantonService } from 'src/app/services/cantones.service';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-seccion-tienda',
  templateUrl: './seccion-tienda.component.html',
  styleUrls: ['./seccion-tienda.component.css']
})
export class SeccionTiendaComponent implements OnInit {
  @Input() objetoUsuario: Usuario = new Usuario();
  isNewTienda = true;
  mostrarFormularioRegistro = false;
  isedicion = false;
  newTienda: Tienda = new Tienda();
  buscartienda: Tienda = new Tienda();
  nowApertura: Date = new Date();
  hora:any;
  hora2:any;

  nowCierre: Date = new Date();
  cc = ""
  existeTienda = false;
  listaCantones : Canton []=[]
  mensajeLoading=""
  mostrarLoading=false
  tiendainhabilitada=false

  tiendaEncontrada = new Tienda();

  constructor(
   public _cantonesService: CantonService,
   public _tiendaService: TiendaService,
   public router: Router
  ) { }

  ngOnInit(): void {    
    this.traerDatosTienda();
    this.traerListaCantones();
  }

  traerDatosTienda(){
   this.buscartienda.cedula= this.objetoUsuario.cedula
   this._tiendaService.obtener_datos_tienda(this.buscartienda).subscribe(
      (res) => {
        var tienda = res as Tienda[];
        if(tienda.length != 0){
          if(tienda[0].id_estado_tienda == 2){
            this.isNewTienda = false;
            this.existeTienda = false;
            this.mostrarFormularioRegistro = false;
            this.tiendainhabilitada=true  
          }else{
            console.log("entre")
            this.ll()
            this.isNewTienda = false;
            this.existeTienda = true;
            this.tiendaEncontrada = tienda[0]
          }
         
        }else{
          this.existeTienda = false;
          this.isNewTienda = true;
        }
          
      },
      (err) => { } )
    
  }

  ll(){
    this.isNewTienda = false;
  }

  traerListaCantones(){
    this._cantonesService.traerListaCantones().subscribe(
      (res) => { this.listaCantones = res as Canton[] },
      (err) => { }
    )
  }


  registrar(){
    this.newTienda.cedula = this.buscartienda.cedula
    var horasuma = new Date(this.hora);
    horasuma.setHours(horasuma.getHours()-5);
    this.newTienda.hora_apertura = horasuma
    var horasumacierre = new Date(this.hora2);
    horasumacierre.setHours(horasumacierre.getHours()-5);
    this.newTienda.hora_cierre = horasumacierre
    this.mensajeLoading = "Registrando tienda";
    this.mostrarLoading = true;
      this._tiendaService.registrar(this.newTienda).subscribe(
      (res) => {
        this.mostrarLoading = false;
        Swal.fire({
          title: 'Tienda registrada',
          text: "Se registró su tienda exitosamente",
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.mostrarFormularioRegistro= false
            this.existeTienda = true;
            this.traerDatosTienda()
            
          } 
        }) 
      
      },
      (err) => {  this.mostrarLoading = false; Swal.fire('error')}
    )  
 

  }
  actualizar(){
    var horasuma = new Date(this.hora);
    horasuma.setHours(horasuma.getHours()-5);
    this.newTienda.hora_apertura = horasuma
    var horasumacierre = new Date(this.hora2);
    horasumacierre.setHours(horasumacierre.getHours()-5);
    this.newTienda.hora_cierre = horasumacierre
    this.mensajeLoading = "Actualizando tienda";
    this.mostrarLoading = true;
     this._tiendaService.actualizar(this.newTienda).subscribe(
      (res) => {
        this.mostrarLoading = false;
        Swal.fire({
          title: 'Tienda actualizada',
          text: "datos guardados",
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.mostrarFormularioRegistro= false
            this.existeTienda = true;
            this.traerDatosTienda()
          }
        }) 
      
      },
      (err) => {  this.mostrarLoading = false; Swal.fire('error')}
    ) 

  }

  crearTienda(){
    this.isNewTienda = false;
    this.mostrarFormularioRegistro = true;
  }

  editartienda(){
    this.existeTienda = false;
    this.isedicion=true;
    this.mostrarFormularioRegistro = true;
      this._tiendaService.obtener_datos_tienda(this.buscartienda).subscribe(
        (res) => {
          this.newTienda = res[0];
         
        },
        (err) => { }
      ) 
  }


  verificarcampos(){
    if(this.newTienda.nombre_ti !==""){
      if(this.newTienda.direccion!==""){
        if(this.newTienda.correo_electronico!==""){
          if(this.newTienda.id_cantones!==0 ){
            if(this.newTienda.telefono !=="" && this.newTienda.telefono.length==10 ){
              if(this.newTienda.descripcion!=="" && this.newTienda.descripcion.length>= 10){
                if(this.hora !== undefined){
                  if(this.hora2 !== undefined){
                    this.recorrerstring(this.newTienda.telefono)
                    if (this.celular ==true){
                      if(!this.isedicion){
                      this.registrar()
                    }else{
                      this.actualizar()
                    }  
                    }else{
                      this.mostrarmensajes('El celular debe contener solo números')
                    }
                    
                  }else{
                    this.mostrarmensajes('Por favor registre una hora de cierre')
                  }
                }else{
                  this.mostrarmensajes('Por favor registre una hora de apertura')
                }
              }else{
            this.mostrarmensajes('Por favor establezca una breve descripción de la tienda')
          }
  
            }else{
          this.mostrarmensajes('Por favor indique el telefono de contacto')
        }
  
          }else{
        this.mostrarmensajes('Debe indicar el cantón a la que pertenece la tienda')
      }
  
        }else{
        this.mostrarmensajes('Indique el correo electrónico de la tienda')
      }
  
      }else{
        this.mostrarmensajes('Indique la direccion de su tienda')
      }
      
    }
    else {
      this.mostrarmensajes('Debe indicar un nombre a su tienda')
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

  celular=true
  recorrerstring(letra:string){
    for( var i = 0; i < letra.length; i++){
      this.celular=true
      var b=letra.charAt(i)
      if ((b == '0') ||(b == '1') ||(b == '2')||(b == '3')||(b == '4')||(b == '5')||(b == '6')||(b == '7')||(b == '8')||(b == '9')){

      }
      else{
        this.celular= false
        break

      }
    }

  }

}
