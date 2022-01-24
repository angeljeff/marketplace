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
  //cantones : Canton[]=[{id:1,nombre:"Guayaquil"},{id:2,nombre:"Manta"}]

  tiendaEncontrada = new Tienda();

  constructor(
   public _cantonesService: CantonService,
   public _tiendaService: TiendaService,
   public router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.objetoUsuario)
    // Crear un metodo para traer la tienda asociada al usuario *(objetousuario.cedula) si no tiene tienda setear la variable idNewTienda en true, sino en false
     
    this.traerDatosTienda();
    this.traerListaCantones();
  }

  traerDatosTienda(){
    //this.isNewTienda = false;
   this.buscartienda.cedula= this.objetoUsuario.cedula
   this._tiendaService.obtener_datos_tienda(this.buscartienda).subscribe(
      (res) => {
        var tienda = res as Tienda[];
        console.log(tienda.length)
        if(tienda.length != 0){
          console.log("entre")
          this.ll()
          this.isNewTienda = false;
          this.existeTienda = true;
          this.tiendaEncontrada = tienda[0]
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
      (res) => { this.listaCantones = res as Canton[];},
      (err) => { }
    )
    
   // var cantones = [{id:1,}]
  }

  setearValorCanton(e:any){ 
    /* console.log(e.value)
    this.newTienda.canton = e.value.id
    console.log("valor canton ",this.newTienda.canton) */

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
            
            /* this.router.navigate(['./seccion-tienda.component.html']);*/
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
            /* this.router.navigate(["/login"]); */
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

          /* console.log(res + "esta es el producto devuelto") */
          
          //this.nombreCanton = this.listaCantones.find(element => element.id_cantones == this.usuarioNuevo.id_cantones)?.descripcion ?? "" ;
         
        },
        (err) => { }
      ) 
    


  }


  verificarcampos(){
    if(this.newTienda.nombre !==""){
      if(this.newTienda.direccion!==""){
        if(this.newTienda.correo_electronico!==""){
          if(this.newTienda.id_cantones!==0 ){
            if(this.newTienda.telefono !=="" && this.newTienda.telefono.length>=5 ){
              if(this.newTienda.descripcion!=="" && this.newTienda.descripcion.length>= 10){
                if(this.hora !== undefined){
                  if(this.hora2 !== undefined){
                    if(!this.isedicion){
                      this.registrar()
                    }else{
                      this.actualizar()
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

}
