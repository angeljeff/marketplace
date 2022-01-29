import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosEnvio } from 'src/app/clases/datosEnvio';
import { OrdenCompra } from 'src/app/clases/ordenCompra';
import { Pedido } from 'src/app/clases/pedido';
import { Producto } from 'src/app/clases/producto';
import { ProductosPorOrdenDTO } from 'src/app/clases/productosOrdenCompra';

@Component({
  selector: 'app-seccion-pedido',
  templateUrl: './seccion-pedido.component.html',
  styleUrls: ['./seccion-pedido.component.css']
})
export class SeccionPedidoComponent implements OnInit {
  mostrarPaso1 = true;
  seccionLista = false;
  totalCompra = 0;
  popupVisible = false;
  mostrarPaso2 = false;
  titulo= "";
  nombrePedido = "";
  nombreTienda = "";
  productoMostrado: Producto = new Producto();
  newDatosEnvio : DatosEnvio = new DatosEnvio();
  popupListaProductos = false;
  dataContactoDirecto = false;
  dataTransferencia = false;
  listaPedidos : Pedido [] = [{
    id_pedido : 1,
    nombre: "Pedido 1",
    cantidadProductos : 10,
    total : 150,
    nombreTienda: "Agripac",
    nombre_estado : "Realizada"
  },
{
    id_pedido : 2,
    nombre: "Pedido 2",
    cantidadProductos : 5,
    total : 60,
    nombreTienda: "Agripac2",
    nombre_estado : "Realizada"
  }]

  ordenes: OrdenCompra[] = []; 
  productosPorOrdenDTO: ProductosPorOrdenDTO[] = []; 

  productos: Producto[] = []; 

pago2 = false;
disablePago2 = true;
imagenPago = ""


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.calcularTotal();
    this.productoMostrado = this.productos[0];
  }

  mostrarPopupProducto(productoOrden : ProductosPorOrdenDTO){
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
    /* this.ordenes.forEach(element=>{
      element.total = element.cantidad * element.precio
      this.totalCompra = this.totalCompra + element.total 
    }) */
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
  

  mostrarListaProductos = (e:any) => {  
    console.log(e.row.data)  
    this.popupListaProductos = true;
    this.nombrePedido = (e.row.data.nombre).toUpperCase();
    this.nombreTienda = (e.row.data.nombreTienda).toUpperCase();
    //traer lista de productos asociadas al pedido
    //asignar la lista al arreglo de pedidos
  }



  asignarValor(num : number){
    if(num == 1){
      this.dataContactoDirecto = true;
      this.dataTransferencia = false;
    }else if(num == 3){
      this.dataContactoDirecto = false;
      this.dataTransferencia = true;
    }
  }

  realizarPedido(){
    //aqui mandar a guardar la orden con estado solicitada
    console.log(this.pago2)
  }

  seguirComprando(){
    var tiendaId = 1; // setear el Id de ña tienda perteneciente a un producto de la orden
    this.router.navigate(['/productos-tienda'], { queryParams: { id: tiendaId } });
  }

  handleFileSelect(evt: any){
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      if(files[0].size > 1048576)
        alert("El archivo excede el tamaño permitido");
      
      var reader = new FileReader();
      reader.onload =this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt:any) {
    var binaryString = readerEvt.target.result;
    var base64textString= btoa(binaryString);
    this.imagenPago ="data:image/png;base64,"+ base64textString
    console.log(this.imagenPago);
  }


  eliminarRegistro(i: number) {
    this.ordenes.splice(i, 1);
    this.calcularTotal();
  }



}
