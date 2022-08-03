import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Producto, Productodto } from 'src/app/clases/producto';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/productos.services';
import { CategoriaService } from 'src/app/services/categorias.service';
import { Usuario } from 'src/app/clases/usuario';
import { ProductocompletoService } from 'src/app/services/productoscompletos';
import { Productocompleto } from 'src/app/clases/Productocompleto';
import { Tienda } from 'src/app/clases/tienda';
import { TiendaService } from 'src/app/services/tienda.service';
import { CorreoService } from 'src/app/services/correoServices';
import { Correo } from 'src/app/clases/Correo';
import { OrdenCompraEsta } from 'src/app/clases/ordenCompra';
import { OrdenCompraService } from 'src/app/services/ordenCompra.service';
import { VentasPrediccion, VentasPrediccionString } from 'src/app/clases/ventas';
import { VentasService } from 'src/app/services/ventasService';

@Component({
  selector: 'app-seccion-proyeccion-administrador',
  templateUrl: './seccion-proyeccion-administrador.component.html',
  styleUrls: ['./seccion-proyeccion-administrador.component.css']
})
export class SeccionProyeccionAdministradorComponent implements OnInit {
  @Input() objetoUsuario: Usuario = new Usuario();
  mostrarLoading=false
  mensajeLoading=""

  seccionPreActuales = true;
  seccionPreFutura = false;
  arreglo_fechas:string[]= []
  arreglo_fechas2:string[]= []
  prediccion: VentasPrediccionString[]= []
  arreglo_prediccion_final: VentasPrediccionString[]= []
  arreglo_prediccion_FUTURO: VentasPrediccionString[]= []





  constructor( public _productoService : ProductoService,
    public router : Router,
    public _ventasService: VentasService
    
    ) { }

  ngOnInit( ): void {
    this.estadisticas_ventas()
    
  }


  mostrarSecProducto(numero : number){
    if(numero == 1) {
      this.seccionPreActuales = true;
      this.seccionPreFutura = false;
      this.estadisticas_ventas()
    }  
    else if(numero == 2){
      this.seccionPreActuales = false;
      this.seccionPreFutura = true;
    }

  }


  estadisticas_ventas(){
    var today = new Date();
    today.setMonth(today.getMonth()-1)
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var fecha_consulta = yyyy + '-' + mm + '-' + dd; // es la fecha actual -1 mes para la consulta
    this.prediccion=[] // arreglo que almacena las fechas consultadas
    this.arreglo_prediccion_final=[] // arreglo final a mostrar
    this.arreglo_fechas= [] // arreglo creado de solo fechas
    this._ventasService.obtener_datos_ventas_prediccion(fecha_consulta).subscribe(
      (res) => {  var predicciones = res as VentasPrediccion[];
        var dia_consulta = Number(dd)
        var sumador_dias=1;
        var nuevo_dia=0
        this.arreglo_fechas= []
        var dia_agregar=""
        for(var i=0; i<30; i++){
          var limite=0
          if(mm=="01" || mm=="03" || mm=="05" || mm=="07" || mm=="08" || mm=="10" || mm=="12"){
            limite=31
            if(nuevo_dia==limite) {
              var hoy = new Date();
              mm=String(hoy.getMonth() + 1).padStart(2, '0');
              sumador_dias=1;
              dia_consulta=0
            }
          }else if(mm=="02"){
            limite=28
            if(nuevo_dia==limite) {
              var hoy = new Date();
              mm=String(hoy.getMonth() + 1).padStart(2, '0');
              sumador_dias=1;
              dia_consulta=0
            }
          }else if(mm=="04"|| mm=="06" || mm=="09" || mm=="11"){
            limite=30
            if(nuevo_dia==limite) {
              var hoy = new Date();
              mm=String(hoy.getMonth() + 1).padStart(2, '0');
              sumador_dias=1;
              dia_consulta=0
            }
          }
          nuevo_dia=dia_consulta +sumador_dias
          if(nuevo_dia<10){
            dia_agregar="0"+nuevo_dia
          }else{ dia_agregar=nuevo_dia.toString()}
          /* var nueva_fecha=yyyy+ '-' + mm + '-' + dia_agregar; */
          var nueva_fecha= dia_agregar + '-' + mm;
          sumador_dias++
          this.arreglo_fechas.push(nueva_fecha)
        }
        console.log(this.arreglo_fechas)
        predicciones.forEach(element3=>{
          var prediccion_final=new VentasPrediccionString
          var fechas=new Date(element3.fecha)
          var dia= String(fechas.getDate()).padStart(2, '0');
          var mes = String(fechas.getMonth() + 1).padStart(2, '0'); //January is 0!
          var anio = fechas.getFullYear();
          /* var fecha_consultada = anio + '-' + mes + '-' + dia; */
          var fecha_consultada = dia + '-' + mes;
          prediccion_final.fecha=fecha_consultada
          prediccion_final.total=element3.total
          this.prediccion.push(prediccion_final)

        })
        this.arreglo_fechas.forEach(element2=>{
          var prediccionn = this.prediccion.find(element=>
            element2 == element.fecha) ?? new VentasPrediccionString
            if(prediccionn.fecha=="")
            prediccionn.fecha = element2
            this.arreglo_prediccion_final.push(prediccionn)


        })
        this.estadisitcas_ventas_prediccion()


                },
      (err) => { }
    )
  }

  estadisitcas_ventas_prediccion(){
    this.arreglo_prediccion_FUTURO=[]
    var N= this.arreglo_prediccion_final.length
    var contador=0
    var sumax=0; var sumay=0; var multixy=0; var sumamultixy=0; var xal2=0; var sumaxal2=0;
    this.arreglo_prediccion_final.forEach(element=>{
      contador++
      sumax=sumax+contador
      sumay=sumay+element.total
      multixy=contador*element.total
      sumamultixy=sumamultixy+multixy
      xal2=contador*contador
      sumaxal2=sumaxal2+xal2
    }) 
    var multi_n_sumaxy=N*sumamultixy
    var multi_sumax_sumay=sumax*sumay
    var resta_1=multi_n_sumaxy-multi_sumax_sumay
    var multi_n_sumaxal2=N*sumaxal2
    var sumaxal2_al2=sumax*sumax
    var resta_2=multi_n_sumaxal2-sumaxal2_al2
    var valor_m=resta_1/resta_2
    var promediox=sumax/N
    var promedioy=sumay/N
    var valor_b=promedioy-(promediox*valor_m)

    var fecha_actual = new Date();
    var dd_ = String(fecha_actual.getDate()).padStart(2, '0');
    var mm_ = String(fecha_actual.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy_ = fecha_actual.getFullYear();
    var fecha_ = yyyy_ + '-' + mm_ + '-' + dd_;
    var dia_nuevo=Number(dd_)
    var suma_dias=1
    var dia_agregar_nuevo=""
    var d_new=0
    var cont=30
    console.log("es el valor X"+sumax)
    console.log("es el valor Y"+sumay)
    console.log("es el valor XY"+sumamultixy)
    console.log("es el valor suma X2"+sumaxal2)
    console.log("es el valor X2"+sumaxal2_al2)
    console.log("es el valor v"+valor_b)
    console.log("es el valor m"+valor_m)
    for(var j=0; j<30; j++){
      var limite_=0
      if(mm_=="01" || mm_=="03" || mm_=="05" || mm_=="07" || mm_=="08" || mm_=="10" || mm_=="12"){
        limite_=31
        if(d_new==limite_) {
          var hoy = new Date();
          hoy.setMonth(hoy.getMonth()+1)
          mm_=String(hoy.getMonth() + 1).padStart(2, '0');
          suma_dias=1;
          dia_nuevo=0
        }
      }else if(mm_=="02"){
        limite_=28
        if(d_new==limite_) {
          var hoy = new Date();
          hoy.setMonth(hoy.getMonth()+1)
          mm_=String(hoy.getMonth() + 1).padStart(2, '0');
          suma_dias=1;
          dia_nuevo=0
        }
      }else if(mm_=="04"|| mm_=="06" || mm_=="09" || mm_=="11"){
        limite_=30
        if(d_new==limite_) {
          var hoy = new Date();
          hoy.setMonth(hoy.getMonth()+1)
          mm_=String(hoy.getMonth() + 1).padStart(2, '0');
          suma_dias=1;
          dia_nuevo=0
        }
      }
      d_new=dia_nuevo +suma_dias
      if(d_new<10){
        dia_agregar_nuevo="0"+d_new
      }else{ dia_agregar_nuevo=d_new.toString()}
      /* var nueva_fecha=yyyy+ '-' + mm + '-' + dia_agregar; */
      var nueva_fecha_= dia_agregar_nuevo + '-' + mm_;
      suma_dias++
      cont++
      var predi= new VentasPrediccionString
      var y=(valor_b+(valor_m*cont))
      predi.fecha=nueva_fecha_
      predi.total=Number(y.toFixed(2))
      this.arreglo_prediccion_FUTURO.push(predi)
    }
    console.log(this.arreglo_prediccion_FUTURO)


  }

  palette: string[] = ['#F781BE', '#58FAD0', '#D0A9F5'];

  paletteIndex = 0;
  customizeText(arg:any) {
    return `$ ${arg.valueText}`;
  }

  customizePoint = () => {
    const color = this.palette[this.paletteIndex];
    this.paletteIndex = this.paletteIndex === 2 ? 0 : this.paletteIndex + 1;

    return {
      color,
    };
  };



}
