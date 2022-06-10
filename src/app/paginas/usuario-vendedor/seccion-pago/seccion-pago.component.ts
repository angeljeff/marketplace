
import { Component, Input, OnInit } from '@angular/core';
import { Met_pag_tienda } from 'src/app/clases/metodopagotienda';
import { Tienda } from 'src/app/clases/tienda';
import { Usuario } from 'src/app/clases/usuario';
import { MetodopagotiendaService } from 'src/app/services/metodopagotienda.service';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seccion-pago',
  templateUrl: './seccion-pago.component.html',
  styleUrls: ['./seccion-pago.component.css']
})
export class SeccionPagoComponent implements OnInit {
  @Input() objetoUsuario: Usuario = new Usuario();
  IsNewTienda = false;
  mostrarConfiguracion = false;
  isedicion = false;
  mostrarDatosPago = false;

  tipoPago1: boolean = false;
  tipoPago2: boolean = false;
  tipoPago3: boolean = false;
  nuevo_metodo_pago : Met_pag_tienda = new Met_pag_tienda()
  consultatienda: Tienda= new Tienda()
  tiendaencontrada: Tienda= new Tienda()
  consulta: Met_pag_tienda= new Met_pag_tienda()
  todosmetodos:Met_pag_tienda[]=[]
  listametodos:Met_pag_tienda[]=[]
  contactodirecto=3
  pagocontraentega=2
  transferenciabancaria=1
  mostrarLoading =false
  poseetienda=false
  existemetodospago=false
  lista:number[] =[3,2,1]
  idMetodoPagoTransferencia = 0


  constructor(
    public _metodopagotiendaservice: MetodopagotiendaService,
    public _tiendaService: TiendaService
            ) { }

  ngOnInit(): void {
    this.consultartienda()

  }

  configurarMetodosPago(){
    this.mostrarConfiguracion = true;
    this.IsNewTienda = false;
    this.guardar()
  }

  cambiarboolean(valor:number){
    if(valor==1){
      if(this.tipoPago1==false){
        this.tipoPago1=true
      }else{
        this.tipoPago1=false
      }
    }
    else if(valor==2){
      if(this.tipoPago2==false){
        this.tipoPago2=true
      }else{
        this.tipoPago2=false
      }

    }
    else if(valor==3){
      if(this.tipoPago3==false){
        this.tipoPago3=true
      }else{
        this.tipoPago3=false
      }
    }
  }
  consultartienda(){
    this.consultatienda.cedula= this.objetoUsuario.cedula
    if(this.consultatienda.cedula==""){
      this.consultatienda.cedula="01"}
    else{this.consultatienda.cedula= this.objetoUsuario.cedula}
    this._tiendaService.obtener_datos_tienda(this.consultatienda).subscribe(
      (res) => { var tienda = res as Tienda[];
        if(tienda.length != 0){
          this.tiendaencontrada = tienda[0]
          this.obtenermetodosdepago()       
        }else{
          this.poseetienda=true;
          this.IsNewTienda = false;
          this.mostrarConfiguracion = false;
        }
                },
      (err) => { }
    )
  }

  guardar(){
    this.nuevo_metodo_pago.id_tienda = Number(this.tiendaencontrada.id_tienda)
    for(let i in this.lista){
      this.nuevo_metodo_pago.id_metodo_pago= this.lista[i]
      this.nuevo_metodo_pago.estado_metodo=0
      this._metodopagotiendaservice.agregarmetodopagotienda(this.nuevo_metodo_pago).subscribe(
        (res) => {        
        },
        (err) => {  this.mostrarLoading = false; Swal.fire('error')}
      )
    }

  }

  obtenermetodosdepago(){
    this.todosmetodos=[]
    this.consulta.id_tienda= Number(this.tiendaencontrada.id_tienda)
    this._metodopagotiendaservice.consultarmetodopagotienda(this.consulta).subscribe(
      (res) => { var metodos = res as Met_pag_tienda[];
        if(metodos.length != 0){
          this.existemetodospago=true
          for(let i in metodos){
            this.todosmetodos.push(metodos[i])
          }
          this.marcarpagos()
        }
        else{
          this.poseetienda=false;
          this.IsNewTienda = true;
          this.mostrarConfiguracion = false;
        }        
        },
        (err) => { }
      )
  }
  marcarpagos(){
   
    this.poseetienda=false;
    this.IsNewTienda = false;
    this.mostrarConfiguracion = true;
    for(let i in this.todosmetodos){
      if(this.todosmetodos[i].id_metodo_pago ==3 && this.todosmetodos[i].estado_metodo ==1){
        this.tipoPago1=true
      }
      if(this.todosmetodos[i].id_metodo_pago ==2 && this.todosmetodos[i].estado_metodo ==1){
        this.tipoPago2=true
      }
      if(this.todosmetodos[i].id_metodo_pago ==1 && this.todosmetodos[i].estado_metodo ==1){
        this.tipoPago3=true
        this.idMetodoPagoTransferencia = this.todosmetodos[i].id_metodo_pago_tienda;
      }
      if(this.todosmetodos[i].id_metodo_pago ==1 && this.todosmetodos[i].estado_metodo ==0){
        this.tipoPago3=false
        this.idMetodoPagoTransferencia = this.todosmetodos[i].id_metodo_pago_tienda;
      }
    }

  }
  guardarpagosdetienda(){
    console.log(this.todosmetodos.length)
    for (let j in this.todosmetodos){   
      console.log(this.nuevo_metodo_pago.id_metodo_pago_tienda +"id")
      if(this.todosmetodos[j].id_metodo_pago == this.contactodirecto){
        this.nuevo_metodo_pago.id_metodo_pago_tienda = this.todosmetodos[j].id_metodo_pago_tienda
        if(this.tipoPago1==true){
          
          this.nuevo_metodo_pago.estado_metodo = 1
          this._metodopagotiendaservice.actualizarmetodopagotienda(this.nuevo_metodo_pago).subscribe(
            (res) => {        },
            (err) => { this.mostrarLoading = false; Swal.fire('error')})  
        }else{
          console.log("1 false")
          this.nuevo_metodo_pago.estado_metodo = 0
          this._metodopagotiendaservice.actualizarmetodopagotienda(this.nuevo_metodo_pago).subscribe(
            (res) => {        },
            (err) => { this.mostrarLoading = false; Swal.fire('error')}) 
        }
      }
      else if(this.todosmetodos[j].id_metodo_pago == this.pagocontraentega){
        this.nuevo_metodo_pago.id_metodo_pago_tienda = this.todosmetodos[j].id_metodo_pago_tienda
        if(this.tipoPago2==true){
          console.log("entre 2 true")
          this.nuevo_metodo_pago.estado_metodo = 1
          this._metodopagotiendaservice.actualizarmetodopagotienda(this.nuevo_metodo_pago).subscribe(
            (res) => {        },
            (err) => { this.mostrarLoading = false; Swal.fire('error')})  
        }else{
          this.nuevo_metodo_pago.estado_metodo = 0
          this._metodopagotiendaservice.actualizarmetodopagotienda(this.nuevo_metodo_pago).subscribe(
            (res) => {        },
            (err) => { this.mostrarLoading = false; Swal.fire('error')}) 
        } 
      }
      else if(this.todosmetodos[j].id_metodo_pago == this.transferenciabancaria){
        this.nuevo_metodo_pago.id_metodo_pago_tienda = this.todosmetodos[j].id_metodo_pago_tienda
        if(this.tipoPago3==true){
          this.nuevo_metodo_pago.estado_metodo = 1
          this._metodopagotiendaservice.actualizarmetodopagotienda(this.nuevo_metodo_pago).subscribe(
            (res) => {        },
            (err) => { this.mostrarLoading = false; Swal.fire('error')})  
        }else{
          this.nuevo_metodo_pago.estado_metodo = 0
          this._metodopagotiendaservice.actualizarmetodopagotienda(this.nuevo_metodo_pago).subscribe(
            (res) => {        },
            (err) => { this.mostrarLoading = false; Swal.fire('error')}) 
        }   
      }
      }
      
    Swal.fire({
      title: 'Metodos de pago guardados de manera correcta',
      text: "********",
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {}
    })

  }

  cambiar(){
    this.mostrarDatosPago = !this.mostrarDatosPago;
  }

}
