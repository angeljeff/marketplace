import { Component, OnInit } from '@angular/core';
import { DatosEnvio } from 'src/app/clases/datosEnvio';
import { OrdenTemporal } from 'src/app/clases/ordenTemporal';
import { Producto } from 'src/app/clases/producto';

@Component({
  selector: 'app-seccion-pedido',
  templateUrl: './seccion-pedido.component.html',
  styleUrls: ['./seccion-pedido.component.css']
})
export class SeccionPedidoComponent implements OnInit {
  mostrarPaso1 = true;
  seccionLista = true;
  totalCompra = 0;
  popupVisible = false;
  mostrarPaso2 = false;
  titulo= "";
  productoMostrado: Producto = new Producto();
  newDatosEnvio : DatosEnvio = new DatosEnvio();

  ordenes: OrdenTemporal[] = [{
    nombre_producto: 'Producto1',
    cantidad : 10,
    id_orden : 1,
    precio : 10.50,
    id_producto : 10,
    total : 50,
    imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
  }, {
    nombre_producto: 'Producto2',
    cantidad : 2,
    id_orden : 1,
    precio : 18.50,
    id_producto : 11,
    total : 25,
    imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
  }]; 

  productos: Producto[] = [{
  nombre: 'Producto1',
  contador : 10,
  descripcion : "Aqui va la descripcion",
  id_estado_pro : 1,
  id_producto : "1",
  id_sub_categoria : 2,
  id_tienda: 1,
  precio : 10,
  stock: 10,
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
  imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
}]; 

pago2 = false;
disablePago2 = true;


  constructor() { }

  ngOnInit(): void {
    this.calcularTotal();
    this.productoMostrado = this.productos[0];
  }

  mostrarPopupProducto(productoOrden : OrdenTemporal){
    // LLamar al metodo obtener producto y traer los datos 
    //asignarle a la variable productoEncontrado
    this.popupVisible = true;
    
  }

  mostrarSecPedido(numero : number){
     if(numero == 1) {
      this.mostrarPaso1 = true;
      this.seccionLista = false;
    }  
    else if(numero = 2){
      this.mostrarPaso1 = false;
      this.seccionLista = true;
    } 
  }

  calcularTotal(){
    this.totalCompra = 0;
    this.ordenes.forEach(element=>{
      element.total = element.cantidad * element.precio
      this.totalCompra = this.totalCompra + element.total 
    })
  }

  cambiarPantalla(num : number){
    if(num == 1){
      this.mostrarPaso1 = true;
      this.mostrarPaso2 = false;
    }else if(num == 2){
      this.mostrarPaso1 = false;
      this.mostrarPaso2 = true;
    }
  }
  


  asignarValor(num : number){
    console.log(num)
  }

  realizarPedido(){
    //aqui mandar a guardar la orden con estado solicitada
    console.log(this.pago2)
  }


  eliminarRegistro(i: number) {
    this.ordenes.splice(i, 1);
    this.calcularTotal();
  }



}