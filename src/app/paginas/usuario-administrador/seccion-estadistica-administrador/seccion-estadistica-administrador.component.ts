import { PercentPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/clases/producto';
import { Productocompleto } from 'src/app/clases/Productocompleto';
import { Tienda } from 'src/app/clases/tienda';
import { Usuario } from 'src/app/clases/usuario';
import { ProductoService } from 'src/app/services/productos.services';
import { ProductocompletoService } from 'src/app/services/productoscompletos';
import { TiendaService } from 'src/app/services/tienda.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-seccion-estadistica-administrador',
  templateUrl: './seccion-estadistica-administrador.component.html',
  styleUrls: ['./seccion-estadistica-administrador.component.css']
})
export class SeccionEstadisticaAdministradorComponent implements OnInit {
    @Input() objetoUsuario: Usuario = new Usuario();
    mostrarLoading=false
    mensajeLoading=""

    seccionEstadisticaProducto = true;
    seccionEstadisticaTienda = false;

    listaProductos : Producto []=[]
    listaTiendas : Tienda []=[]

    productos: Producto[] = [{
  nombre: 'Producto1',
  contador : 3,
  descripcion : "jjj",
  id_estado_pro : 1,
  id_producto : "1",
  id_sub_categoria : 2,
  id_tienda: 1,
  precio : 10,
  stock: 10,
  estado:1,
  imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
}, {
  nombre: 'Producto2',
  contador : 10,
  descripcion : "jjj",
  id_estado_pro : 1,
  id_producto : "1",
  id_sub_categoria : 2,
  id_tienda: 1,
  precio : 10,
  stock: 10,
  estado:1,
  imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
}, {
  nombre: 'Producto3',
  contador : 8,
  descripcion : "jjj",
  id_estado_pro : 1,
  id_producto : "1",
  id_sub_categoria : 2,
  id_tienda: 1,
  precio : 10,
  stock: 10,
  estado:1,
  imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
},{
  nombre: 'Producto4',
  contador : 8,
  descripcion : "jjj",
  id_estado_pro : 1,
  id_producto : "1",
  id_sub_categoria : 2,
  id_tienda: 1,
  precio : 10,
  stock: 10,
  estado:1,
  imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
},{
  nombre: 'Producto5',
  contador : 8,
  descripcion : "jjj",
  id_estado_pro : 1,
  id_producto : "1",
  id_sub_categoria : 2,
  id_tienda: 1,
  precio : 10,
  stock: 10,
  estado:1,
  imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
},{
  nombre: 'Producto6',
  contador : 8,
  descripcion : "jjj",
  id_estado_pro : 1,
  id_producto : "1",
  id_sub_categoria : 2,
  id_tienda: 1,
  precio : 10,
  stock: 10,
  estado:1,
  imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
},{
  nombre: 'Producto7',
  contador : 8,
  descripcion : "jjj",
  id_estado_pro : 1,
  id_producto : "1",
  id_sub_categoria : 2,
  id_tienda: 1,
  precio : 10,
  stock: 10,
  estado:1,
  imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
},{
  nombre: 'Producto8',
  contador : 8,
  descripcion : "jjj",
  id_estado_pro : 1,
  id_producto : "1",
  id_sub_categoria : 2,
  id_tienda: 1,
  precio : 10,
  stock: 10,
  estado:1,
  imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
},{
  nombre: 'Producto9',
  contador : 8,
  descripcion : "jjj",
  id_estado_pro : 1,
  id_producto : "1",
  id_sub_categoria : 2,
  id_tienda: 1,
  precio : 10,
  stock: 10,
  estado:1,
  imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
},{
  nombre: 'Producto36',
  contador : 8,
  descripcion : "jjj",
  id_estado_pro : 1,
  id_producto : "1",
  id_sub_categoria : 2,
  id_tienda: 1,
  precio : 10,
  stock: 10,
  estado:1,
  imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
},{
  nombre: 'Producto35',
  contador : 8,
  descripcion : "jjj",
  id_estado_pro : 1,
  id_producto : "1",
  id_sub_categoria : 2,
  id_tienda: 1,
  precio : 10,
  stock: 10,
  estado:1,
  imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
},{
  nombre: 'Producto34',
  contador : 8,
  descripcion : "jjj",
  id_estado_pro : 1,
  id_producto : "1",
  id_sub_categoria : 2,
  id_tienda: 1,
  precio : 10,
  stock: 10,
  estado:1,
  imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
},{
  nombre: 'Producto33',
  contador : 8,
  descripcion : "jjj",
  id_estado_pro : 1,
  id_producto : "1",
  id_sub_categoria : 2,
  id_tienda: 1,
  precio : 10,
  stock: 10,
  estado:1,
  imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
},{
  nombre: 'Producto32',
  contador : 8,
  descripcion : "jjj",
  id_estado_pro : 1,
  id_producto : "1",
  id_sub_categoria : 2,
  id_tienda: 1,
  precio : 10,
  stock: 10,
  estado:1,
  imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
},{
  nombre: 'Producto38',
  contador : 23,
  descripcion : "jjj",
  id_estado_pro : 1,
  id_producto : "1",
  id_sub_categoria : 2,
  id_tienda: 1,
  precio : 10,
  stock: 10,
  estado:1,
  imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
},{
  nombre: 'Producto39',
  contador : 80,
  descripcion : "jjj",
  id_estado_pro : 1,
  id_producto : "1",
  id_sub_categoria : 2,
  id_tienda: 1,
  precio : 10,
  stock: 10,
  estado:1,
  imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
},{
  nombre: 'Producto37',
  contador : 50,
  descripcion : "jjj",
  id_estado_pro : 1,
  id_producto : "1",
  id_sub_categoria : 2,
  id_tienda: 1,
  precio : 10,
  stock: 10,
  estado:1,
  imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
}]; 


tituloPopup = ""
textoPopup = ""
pipe: any = new PercentPipe('en-US');
arregloEstadisticaProductos : Estadistica [] = []
arregloEstadisticaTiendas : Estadistica [] = []



  constructor( public router : Router,
    public _usuarioService : UsuarioService,
    public _tiendaService : TiendaService,
    public _productoService : ProductoService) { }

  ngOnInit( ): void {
    this.traerListadoProductos()
    this.traerListadoTiendas()
  }

  mostrarSecEstadisticas(numero : number){
    if(numero == 1) {
      this.seccionEstadisticaProducto = true;
      this.seccionEstadisticaTienda = false;
    }  
    else if(numero == 2){
      this.seccionEstadisticaProducto = false;
      this.seccionEstadisticaTienda = true;
    }
  }

  traerListadoProductos(){
    this._productoService.listarProductos().subscribe(
      (res) => {  this.listaProductos = res as Producto[];
                  this.crearObjetoEstadistica()},
      (err) => { })
  }


  traerListadoTiendas(){
     this._tiendaService.traerListaTiendas().subscribe(
      (res) => {  this.listaTiendas = res as Tienda[];
                  this.crearObjetoEstadisticaTienda()},
      (err) => { })
  }

  crearObjetoEstadistica(){
    var cont = 0;
    this.listaProductos.sort((a,b) => (a.contador < b.contador ? 1 : -1));
    this.listaProductos.forEach(element=>{
      cont++
      if(cont<=10){
        var nuevaEstadistica = new Estadistica();
        nuevaEstadistica.nombre = element.nombre
        nuevaEstadistica.val = element.contador
        this.arregloEstadisticaProductos.push(nuevaEstadistica)
      }
    })
  }

  crearObjetoEstadisticaTienda(){
    var cont = 0;
    this.listaTiendas.sort((a,b) => (a.contador < b.contador ? 1 : -1));
    this.listaTiendas.forEach(element=>{
      cont++
      if(cont<=10){
        var nuevaEstadistica = new Estadistica();
        nuevaEstadistica.nombre = element.nombre
        nuevaEstadistica.val = element.contador
        this.arregloEstadisticaTiendas.push(nuevaEstadistica)
      }
    })
  }


  customizeTooltip = (arg: any) => ({
    text: `${arg.valueText} - ${this.pipe.transform(arg.percent, '1.2-2')}`,
  });

  customizeLabel(arg:any) {
    return `${arg.argumentText} - ${arg.valueText} (${arg.percentText})`;
  }


}

export class Estadistica{
  nombre: string
  val: number
  constructor(){
    this.nombre = ""
    this.val = 0
  }
}
