import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seccion-pago',
  templateUrl: './seccion-pago.component.html',
  styleUrls: ['./seccion-pago.component.css']
})
export class SeccionPagoComponent implements OnInit {
  IsNewTienda = true;
  mostrarConfiguracion = false;
  isedicion = false;
  mostrarDatosPago = false;

  tipoPago1: Boolean = false;
  tipoPago2: Boolean = false;
  tipoPago3: Boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  configurarMetodosPago(){
    this.mostrarConfiguracion = true;
    this.IsNewTienda = false;

  }

  cambiar(e:any){
    if(e.value)
      this.mostrarDatosPago = true;
    else
      this.mostrarDatosPago = false;
  }

}
