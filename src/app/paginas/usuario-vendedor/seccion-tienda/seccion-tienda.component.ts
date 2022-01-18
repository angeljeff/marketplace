import { Component, OnInit } from '@angular/core';
import { event } from 'devextreme/events';
import { Canton } from 'src/app/clases/canton';
import { Tienda } from 'src/app/clases/tienda';

@Component({
  selector: 'app-seccion-tienda',
  templateUrl: './seccion-tienda.component.html',
  styleUrls: ['./seccion-tienda.component.css']
})
export class SeccionTiendaComponent implements OnInit {
  IsNewTienda = false;
  mostrarFormularioRegistro = false;
  isedicion = false;
  newTienda: Tienda = new Tienda();
  nowApertura: Date = new Date();
  nowCierre: Date = new Date();
  cc = ""
  existeTienda = true;

  //cantones : Canton[]=[{id:1,nombre:"Guayaquil"},{id:2,nombre:"Manta"}]

  tiendaEncontrada = new Tienda();

  constructor() { }

  ngOnInit(): void {
    // Crear un metodo para traer la tienda asociada al usuario si no tiene tienda setear la variable idNewTienda en true, sino en false
    this.traerDatosTienda();
    this.traerListaCantones();
  }

  traerDatosTienda(){
    this.tiendaEncontrada.nombre = "AGRIPAC";
    this.tiendaEncontrada.direccion = "Av. 25 de Julio"
    this.tiendaEncontrada.hora_apertura = "10:00";
    this.tiendaEncontrada.hora_cierre = "17:00";
    this.tiendaEncontrada.descripcion = "Tenemos la visión de consolidar al Grupo Corporativo en todo el territorio ecuatoriano, enfocando nuestro futuro en el cliente como base del éxito del negocio. Con esta premisa, cumplimos con la misión de ofrecer soluciones integrales a través de la provisión de insumos de alta calidad gracias a nuestra filosofía de servicio permanente."
   /*  this._tiendaService.traerDatosTienda(usuarioId).subscribe(
      (res) => { 
        var tienda = res as Tienda[];
        if(tienda.length != 0){
          this.existeTienda = true;
          this.tiendaEncontrada =tienda[0]
        }else
          this.existeTienda = false;
      },
      (err) => { 
      }
    ) */
    
  }

  traerListaCantones(){
   // var cantones = [{id:1,}]
  }

  setearValorCanton(e:any){ 
    console.log(e.value)
    this.newTienda.canton = e.value.id
    console.log("valor canton ",this.newTienda.canton)

  }


  registrar(){
    console.log(this.newTienda)
    console.log(this.nowApertura)
    console.log(this.nowCierre)
  }

  crearTienda(){
    this.IsNewTienda = false;
    this.mostrarFormularioRegistro = true;
  }

  editartienda(){

  }

}
