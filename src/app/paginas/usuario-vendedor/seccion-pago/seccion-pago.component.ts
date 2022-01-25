import { Component, Input, OnInit } from '@angular/core';
import { Met_pag_tienda } from 'src/app/clases/metodopagotienda';
import { Tienda } from 'src/app/clases/tienda';
import { Usuario } from 'src/app/clases/usuario';
import { MetodopagotiendaService } from 'src/app/services/metodopagotienda.service';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-seccion-pago',
  templateUrl: './seccion-pago.component.html',
  styleUrls: ['./seccion-pago.component.css']
})
export class SeccionPagoComponent implements OnInit {
  @Input() objetoUsuario: Usuario = new Usuario();
  IsNewTienda = true;
  mostrarConfiguracion = false;
  isedicion = false;
  mostrarDatosPago = false;

  tipoPago1: Boolean = false;
  tipoPago2: Boolean = false;
  tipoPago3: Boolean = false;
  nuevo_metodo_pago : Met_pag_tienda = new Met_pag_tienda()
  consultatienda: Tienda= new Tienda()
  tiendaencontrada: Tienda= new Tienda()


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

  }
  consultartienda(){
    this.consultatienda.cedula= this.objetoUsuario.cedula
    this._tiendaService.obtener_datos_tienda(this.consultatienda).subscribe(
      (res) => { var tienda = res as Tienda[];
        if(tienda.length != 0){
          this.mostrarConfiguracion = true;
          this.IsNewTienda = false;
          console.log("entre")
          this.tiendaencontrada = tienda[0]
          console.log( this.tiendaencontrada.id_tienda + "esta es la tienda obtenida")
        }else{
          this.IsNewTienda = true;
          this.mostrarConfiguracion = false;
        }
                },
      (err) => { }
    )
  }

  cambiar(e:any){
    if(e.value)
      this.mostrarDatosPago = true;
    else
      this.mostrarDatosPago = false;
  }

}
