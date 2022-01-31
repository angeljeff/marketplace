import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosEnvio } from 'src/app/clases/datosEnvio';
import { OrdenCompra, OrdenCompraDto } from 'src/app/clases/ordenCompra';
import { Pedido } from 'src/app/clases/pedido';
import { Producto } from 'src/app/clases/producto';
import { ProductosPorOrdenDTO } from 'src/app/clases/productosOrdenCompra';
import { Usuario } from 'src/app/clases/usuario';
import { OrdenCompraService } from 'src/app/services/ordenCompra.service';
import { ProductoPorOrdenService } from 'src/app/services/productoPorOrden.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seccion-pedido',
  templateUrl: './seccion-pedido.component.html',
  styleUrls: ['./seccion-pedido.component.css']
})
export class SeccionPedidoComponent implements OnInit {
  @Input() objetoUsuario: Usuario = new Usuario();
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
  listaPedidos : OrdenCompraDto [] = []

  ordenes: OrdenCompra[] = []; 
  nuevaOrden :OrdenCompra = new OrdenCompra()
  productosPorOrdenDTO: ProductosPorOrdenDTO[] = []; 

  productos: Producto[] = []; 

  pago2 = false;
  disablePago2 = true;
  imagenPago = ""


  constructor(private router: Router,
    public _ordenesService : OrdenCompraService,
    public _productoPorOrdenService : ProductoPorOrdenService) { }

  ngOnInit(): void {
    this.traerListadoOrdenes()
    
    
  }

  traerListadoOrdenes(){
    var cedula = localStorage.getItem("cedulaUser") ?? "";
    this.nuevaOrden.cedula = cedula
    
    this._ordenesService.traerOrdenPorUsuarioDTO(this.nuevaOrden).subscribe(
      (res) => { var ordenes = res as OrdenCompraDto[];
                  this.separarOrdenes(ordenes)},
      (err) => { }
    )  
  }

  separarOrdenes(lista : OrdenCompraDto[]){
    lista.forEach(element=>{
      if(element.id_estado_pedido == 5 || element.id_estado_pedido == 1){
        //nada
      }else{
        this.listaPedidos.push(element)
      }

    })
  }

  traerProductosPorOrden(){
    this._productoPorOrdenService.traerListadoPorOrden(this.nuevaOrden).subscribe(
      (res) => { 
        this.productosPorOrdenDTO = res as ProductosPorOrdenDTO[];
        this.calcularTotal();
      },
      (err) => {  Swal.fire("error")} 
    )
  }

  calcularTotal(){
    this.productosPorOrdenDTO.forEach(element=>{
      element.total_producto = element.cantidad * element.precio_producto
      this.totalCompra = this.totalCompra + element.total_producto
    }) 
  }

  mostrarPopupProducto(productoOrden : ProductosPorOrdenDTO){
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



  
  

  mostrarListaProductos = (e:any) => {  
    console.log(e.row.data)
    this.nuevaOrden.id_orden_compra = e.row.data.id_orden_compra
    this.traerProductosPorOrden() 
    this.popupListaProductos = true;
    this.nombreTienda = (e.row.data.nombre_ti).toUpperCase();
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


}
