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

}
