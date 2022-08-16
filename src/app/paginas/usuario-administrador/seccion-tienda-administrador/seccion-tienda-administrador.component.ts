import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { Tienda } from 'src/app/clases/tienda';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-seccion-tienda-administrador',
  templateUrl: './seccion-tienda-administrador.component.html',
  styleUrls: ['./seccion-tienda-administrador.component.css']
})
export class SeccionTiendaAdministradorComponent implements OnInit {
  @Input() objetoUsuario: Usuario = new Usuario();
  mostrarLoading=false
  mensajeLoading=""

  seccionTiendasActivas = true;
  seccionTiendasInactivas = false;

  tiendas: Tienda[] = []; 
  listaTiendasActivas : Tienda []=[]
  listaTiendasInactivas : Tienda []=[]
  idEstadoTienda = 0;
  tituloPopup = ""
  textoPopup = ""

  constructor( public _tiendaService : TiendaService,
                public router : Router) { }

  ngOnInit( ): void {
    this.traerListadoTiendas()
  }

  traerListadoTiendas(){
    this._tiendaService.traerListaTiendas().subscribe(
      (res) => {  this.tiendas = res as Tienda[];
                  this.separarTiendas(this.tiendas)},
      (err) => { })
    
  }

  separarTiendas(lista: Tienda[]){
    this.listaTiendasActivas = []
    this.listaTiendasInactivas = []
    lista.forEach(element=>{
      if(element.id_estado_tienda == 1)
        this.listaTiendasActivas.push(element)
      else if(element.id_estado_tienda == 2)
        this.listaTiendasInactivas.push(element)
    })
    this.listaTiendasActivas.forEach(ele=>{
      var horasuma = new Date(ele.hora_apertura);
      ele.hora_apertura=new Date(horasuma.setHours(horasuma.getHours()+5));
      var horacierre= new Date(ele.hora_cierre);
      ele.hora_cierre=new Date(horacierre.setHours(horacierre.getHours()+5));
    } )
    this.listaTiendasInactivas.forEach(ele=>{
      var horasuma = new Date(ele.hora_apertura);
      ele.hora_apertura=new Date(horasuma.setHours(horasuma.getHours()+5));
      var horacierre= new Date(ele.hora_cierre);
      ele.hora_cierre=new Date(horacierre.setHours(horacierre.getHours()+5));
    } )
  }

  INTienda = (e:any) => { 
    //Activa = 1 
    //INACTIVA = 2 
    this.idEstadoTienda = 2;
    this.tituloPopup = "Inactivar Tienda"
    this.textoPopup = "Se inactivará la tienda "
    this.editarTienda(e.row.data)  
  }

  ACTienda = (e:any) => { 
    this.idEstadoTienda = 1;
    this.tituloPopup = "Activar Tienda"
    this.textoPopup = "Se activará la tienda "
    this.editarTienda(e.row.data)  
  }



  editarTienda(tienda: Tienda){
    Swal.fire({
      title: this.tituloPopup,
      text: this.textoPopup + tienda.nombre_ti,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        tienda.id_estado_tienda = this.idEstadoTienda;
        if(this.idEstadoTienda == 1){
          this._tiendaService.activar_tienda(tienda).subscribe(
          (res) => { Swal.fire("Ok","Tienda Actualizada","success");this.traerListadoTiendas()},
          (err) => { Swal.fire('error')}) 
        }
        else if(this.idEstadoTienda == 2){
          this._tiendaService.elminar_tienda(tienda).subscribe(
          (res) => { Swal.fire("Ok","Tienda Actualizada","success");this.traerListadoTiendas()},
          (err) => { Swal.fire('error')}) 
        }
         
      }
    }) 
  }





  mostrarSecProducto(numero : number){
    if(numero == 1) {
      this.seccionTiendasActivas = true;
      this.seccionTiendasInactivas = false;
    }  
    else if(numero == 2){
      this.seccionTiendasActivas = false;
      this.seccionTiendasInactivas = true;
    }
  }

  
}
