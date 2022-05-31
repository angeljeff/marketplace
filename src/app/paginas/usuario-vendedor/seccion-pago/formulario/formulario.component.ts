import { Component, Input, OnInit } from '@angular/core';
import { Banco } from 'src/app/clases/Banco';
import { DatosPago, DatosPagopresentacion } from 'src/app/clases/datosPago';
import { Usuario } from 'src/app/clases/usuario';
import { AuthenService } from 'src/app/services/authen.service';
import { BancoService } from 'src/app/services/banco.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DatoscuentabancoService } from 'src/app/services/cuentabancaria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  @Input() idPago:number = 0;
  newDatosPago : DatosPago = new DatosPago();
  listadoDatosPago : DatosPago [] = []
  lista_bancos: Banco [] = [];
  tipocuenta:string[]= ["Ahorros", "Corriente"]
  comprobarcedula: any;
  nuevacuentabancaria: DatosPago = new DatosPago()
  cuentabanco: DatosPago= new DatosPago()
  listadoDatosPagoBanco: DatosPago[] = [];
   listafinal:DatosPagopresentacion  [] = [];


  menu: string[] = [
    'Nueva Cuenta',
    'Cuentas Activas',
  ];

  newCuenta = true;

  menuDefault = ""

  constructor(
    public _bancoservice : BancoService,
    public authenService : AuthenService,
    public userService : UsuarioService,
    public cuentabancaria : DatoscuentabancoService,
      ) { }

  ngOnInit(): void {
    this.menuDefault = this.menu[0];
    this.traerListadobancos()
    this. obtenercuentas()
  }

  

  opcionRadioTipos(e:any){
    this.menuDefault = e.value;
    switch (e.value) {
      case "Nueva Cuenta":
        this.newCuenta = true;
        break;
      case "Cuentas Activas":
        this.newCuenta = false;
        this. obtenercuentas()
        break;
      default:    
    }      
  }

  traerListadobancos(){
    this._bancoservice.traerListaBancos().subscribe(
      (res) => { this.lista_bancos = res as Banco[];},
      (err) => { }
    )
  }

  guardar(){
    this.newDatosPago.id_metodo_pago_tienda = this.idPago
    console.log(this.idPago)
    this.cuentabancaria.registrarcuentaB(this.newDatosPago).subscribe(
    (res)=> { Swal.fire({
      title: 'cuenta guardada  manera correcta',
      text: "********",
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {}
        this.newDatosPago = new DatosPago()
    })},
    (err)=>{}
    )


    
  }

  verificarcampos(){
    if(this.newDatosPago.titular_cuenta!=="" && this.newDatosPago.titular_cuenta.length > 10){
      if(this.newDatosPago.cedula_titular!=="" && this.newDatosPago.cedula_titular.length === 10){
        if(this.newDatosPago.id_banco!==0){
          if(this.newDatosPago.numero_cuenta!=="" && this.newDatosPago.numero_cuenta.length > 5){
            if(this.newDatosPago.tipo_cuenta!=="" ){
              this.comprobarcedula = this.validarCedula(this.newDatosPago.cedula_titular);
              if(this.comprobarcedula=== true){
                this.recorrerstring(this.newDatosPago.numero_cuenta)
                if(this.celular == true){
                   this.guardar() 
                }else{
                  this.mostrarmensajes('ingrese un número de cuenta válido')
                }

              }else{
            this.mostrarmensajes('Por favor ingrese un número de cédula válida')
          }
  
            }else{
          this.mostrarmensajes('Por favor indique el tipo de cuenta')
        }
  
          }else{
        this.mostrarmensajes('Por favor el numero de cuenta')
      }
  
        }else{
        this.mostrarmensajes('Debe seleccionar el banco')
      }
  
      }else{
        this.mostrarmensajes('Debe indicar su numero de cedula')
      }
      
    }
    else {
      this.mostrarmensajes('Debe indicar los nombres del titular de la cuenta')
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
  obtenercuentas(){
    this.cuentabanco.id_metodo_pago_tienda= this.idPago
    this.cuentabancaria.consultardatosbancarios(this.cuentabanco).subscribe(
      (res)=> {this.listafinal = res as DatosPagopresentacion[]
               if(this.listafinal.length !=0){
                 for(let i in this.listafinal){
                  this.listafinal[i].cedula_titular= '0'+ this.listafinal[i].cedula_titular
                 }
               }
              },
      (err)=>{})


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
