import { Component, OnInit } from '@angular/core';
import { DatosPago } from 'src/app/clases/datosPago';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  newDatosPago : DatosPago = new DatosPago();
  listadoDatosPago : DatosPago [] = []

  menu: string[] = [
    'Nueva Cuenta',
    'Cuentas Activas',
  ];

  newCuenta = true;

  menuDefault = ""

  constructor() { }

  ngOnInit(): void {
    this.menuDefault = this.menu[0];
  }


  opcionRadioTipos(e:any){
    this.menuDefault = e.value;
    switch (e.value) {
      case "Nueva Cuenta":
        this.newCuenta = true;
        break;
      case "Cuentas Activas":
        this.newCuenta = false;
        break;
      default:    
    }      
  }

  guardar(){
    
  }

}
