import { core } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { iif } from 'rxjs';
import { Correo, CorreoPedido } from 'src/app/clases/Correo';
import { OrdenCompra, OrdenCompraDto } from 'src/app/clases/ordenCompra';
import { PagoPorOrden } from 'src/app/clases/pagoPorOrden';
import { Producto } from 'src/app/clases/producto';
import { ProductosPorOrdenDTO } from 'src/app/clases/productosOrdenCompra';
import { Tienda } from 'src/app/clases/tienda';
import { Usuario } from 'src/app/clases/usuario';
import { Ventas } from 'src/app/clases/ventas';
import { CorreoService } from 'src/app/services/correoServices';
import { OrdenCompraService } from 'src/app/services/ordenCompra.service';
import { PagoPorOrdenService } from 'src/app/services/pagoPorOrden.service';
import { ProductoPorOrdenService } from 'src/app/services/productoPorOrden.service';
import { ProductoService } from 'src/app/services/productos.services';
import { TiendaService } from 'src/app/services/tienda.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VentasService } from 'src/app/services/ventasService';
import Swal from 'sweetalert2';

import { Productos } from '../usuario-vendedor.component';

@Component({
  selector: 'app-ordenes-vendedor',
  templateUrl: './ordenes-vendedor.component.html',
  styleUrls: ['./ordenes-vendedor.component.css']
})
export class OrdenesVendedorComponent implements OnInit {
  @Input() objetoUsuario: Usuario = new Usuario();
  listaPedidosSolicitados : OrdenCompraDto [] = []
  listaPedidos : OrdenCompraDto [] = []

  ordenes: OrdenCompra[] = []; 
  nuevaOrden :OrdenCompra = new OrdenCompra()
  productosPorOrdenDTO: ProductosPorOrdenDTO[] = []; 
  popupListaProductos = false
  totalCompra = 0
  idEstadoOrden = 0
  tituloPopup = ""
  textoPopup = ""
  imagenPago = ""
  ordenaMostrar : OrdenCompraDto = new OrdenCompraDto
  orden_actaulizar_stock: OrdenCompraDto= new OrdenCompraDto
  orden_actaulizar: OrdenCompra= new OrdenCompra
  actualizacionorden: OrdenCompraDto= new OrdenCompraDto
  correo: CorreoPedido = new CorreoPedido()

  tienda : Tienda = new Tienda()
  mostrarP = false
  poputaprobacion=false

  seccionListActivas: boolean= true;
  seccionTodasordenes: boolean= false;
  listaProductos: Producto []=[]
  usuario: Usuario = new Usuario()
  fechaorden:any="";
  sUBTOTAL: number=0;
   _IVA: number=0;
  envio: number=0;
  primerdigito=""
  digito=""

  constructor(public _ordenesService : OrdenCompraService,
    public _tiendaService: TiendaService,
    public _pagoPorOrdenService : PagoPorOrdenService,
    public _productoService : ProductoService,
    public _ventasService : VentasService,
    public _productoPorOrdenService : ProductoPorOrdenService,
    public _correoService: CorreoService,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit(): void {
    this.traerListadoProductos()
    this.traerTienda()
  }

  traerListadoProductos(){
    this._productoService.obtener_todos_productos_activos().subscribe(
      (res) => {
       this.listaProductos = res as Producto[];
      },
      (err) => { } )
  }

  traerTienda(){
    var cedula = localStorage.getItem("cedulaUser") ?? "";
    this.tienda.cedula = cedula
    this._tiendaService.obtener_datos_tienda(this.tienda).subscribe(
      (res) => {
        var tienda = res as Tienda[];
        this.tienda = tienda[0];
        this.traerListadoOrdenes()
      },
      (err) => { } )
  }

  traerListadoOrdenes(){
    this._ordenesService.obtenerOrdenesPorTienda(this.tienda).subscribe(
      (res) => { var ordenes = res as OrdenCompraDto[];
                  
                  this.separarOrdenes(ordenes)},
      (err) => { }
    )  
  }

  separarOrdenes(lista : OrdenCompraDto[]){
    this.listaPedidos = []
    this.listaPedidosSolicitados = []
    lista.forEach(element=>{
      if(element.id_estado_pedido == 4){
        this.listaPedidosSolicitados.push(element)
      }else{
        if(element.id_estado_pedido == 2 || element.id_estado_pedido == 3)
          this.listaPedidos.push(element)
      }
    })
  }


  ETOrden = (e:any) => { 
    this.idEstadoOrden = 2;
    this.tituloPopup = "Aprobar orden"
    this.textoPopup = "Está seguro de marcar la orden como aprobada"
    this.editarOrden(e.row.data)  
  }

  RCOrden = (e:any) => { 
    this.idEstadoOrden = 3;
    this.tituloPopup = "Rechazar Orden"
    this.textoPopup = "Está seguro de marcar la orden como rechazada"
    this.editarOrden(e.row.data)  
  }

  editarOrden(orden: OrdenCompraDto){
    
    this.actualizacionorden=orden
    this.poputaprobacion=true;
    this.orden_actaulizar_stock= new OrdenCompraDto
/*     Swal.fire({
      title: this.tituloPopup,
      text: this.textoPopup ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orden_actaulizar_stock= orden
        orden.id_estado_pedido = this.idEstadoOrden;
        if(this.idEstadoOrden==2){
          this.actualizarCantidadProductos()
        }
        this._ordenesService.actualizarEstadoOrden(orden).subscribe(
          (res) => { Swal.fire("Ok","Orden actualizada","success");
                    this.traerListadoOrdenes()
                    if(orden.id_estado_pedido == 2){
                      var ventas = new Ventas()
                      ventas.id_orden_compra= orden.id_orden_compra
                      this._ventasService.agregarventa(ventas).subscribe(
                        (res)=>{}, (err)=>{}
                      )
          
                    }
                  },
                   
          (err) => { Swal.fire('error')}
        ) 
      }
    }) */ 
  }


  actualizar_estado_pedido(){
    this.orden_actaulizar_stock= this.actualizacionorden
    this.orden_actaulizar_stock.id_estado_pedido = this.idEstadoOrden;
    this.poputaprobacion=false;
    if(this.idEstadoOrden==2){
      this.actualizarCantidadProductos()
    }
    this._ordenesService.actualizarEstadoOrden(this.orden_actaulizar_stock).subscribe(
      (res) => { Swal.fire("Ok","Orden actualizada","success");
                this.consultarusuario()
                this.traerListadoOrdenes()
                if(this.orden_actaulizar_stock.id_estado_pedido == 2){
                  var ventas = new Ventas()
                  ventas.id_orden_compra= this.orden_actaulizar_stock.id_orden_compra
                  this._ventasService.agregarventa(ventas).subscribe(
                    (res)=>{}, (err)=>{}
                  )
      
                }
              },
               
      (err) => { Swal.fire('error')}
    ) 

  }

  consultarusuario(){
    this.usuario= new Usuario
    this.usuario.cedula= this.orden_actaulizar_stock.cedula
    this._usuarioService.obtenerDatoCedula(this.usuario).subscribe(
      (res) => { 
        if (res[0].cedula != ""){
         this.correo.email= res[0].correo
         this.enviar_correo_usuario()
        }
        
        
 
      },
      (err) => {console.log("errror") }
    )

  }
 
  enviar_correo_usuario(){
    this.correo.asunto="Respuesta al pedido realizado";
    console.log("este es el correo"+this.correo.email)
    this.correo.mensaje=this.orden_actaulizar_stock.nombre_ti;
    /* this.correo.fecha=this.actualizacionorden.fecha_orden.toDateString() */
    var fech=new Date(this.actualizacionorden.fecha_orden).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
    this.correo.fecha= fech
    this._correoService.enviar_correo_aprobacion_pedido(this.correo).subscribe(
      (res) => { console.log("estoy en la respuesta"+res);
      
       
        
      },
      (err) => {  Swal.fire("Error","No se pudo actualizar su contraseña","error")})


  }

  actualizarCantidadProductos(){
    if(this.productosPorOrdenDTO.length ==0){
      this._productoPorOrdenService.traerListadoPorOrden(this.orden_actaulizar_stock).subscribe(
        (res) => { 
          this.productosPorOrdenDTO = res as ProductosPorOrdenDTO[];
          this.calcularTotal();
          console.log(this.productosPorOrdenDTO)
          this.productosPorOrdenDTO.forEach(element2=>{
            var producto = this.listaProductos.find(element=> element.id_producto == element2.id_producto.toString()) ?? new Producto()
            producto.stock = (producto.stock ?? 0) - element2.cantidad
            producto.unidades_vendidas= (producto.unidades_vendidas ?? 0) + element2.cantidad
            this._productoService.actualizarStock(producto).subscribe(
              (res) => { },
              (err) => { Swal.fire('error')}
            ) 
          })
        },
        (err) => {  Swal.fire("error")} 
      )
    }else{
      this.productosPorOrdenDTO.forEach(element2=>{    
        var producto = this.listaProductos.find(element=> element.id_producto == element2.id_producto.toString()) ?? new Producto()
        producto.stock = (producto.stock ?? 0) - element2.cantidad
        producto.unidades_vendidas= (producto.unidades_vendidas ?? 0) + element2.cantidad
        this._productoService.actualizarStock(producto).subscribe(
          (res) => { },
          (err) => { Swal.fire('error')}
        ) 
      })

    }

  }

  traerImagenPago(){
    this.imagenPago= ""
    this._pagoPorOrdenService.obtenerPagoPorIdOrden(this.nuevaOrden).subscribe(
      (res) => { var lista = res as PagoPorOrden[]
                if(lista.length != 0)
                  this.imagenPago = lista[0].imagen_comprobante
        },
      (err) => { Swal.fire('error')}
    ) 
  }

  mostrarPago(){
    this.mostrarP = !this.mostrarP
  }
  cancelar(){
    this.poputaprobacion=false
  }


  mostrarListaProductos = (e:any) => {  
    console.log(e.row.data)
    this.nuevaOrden.id_orden_compra = e.row.data.id_orden_compra
    this.traerProductosPorOrden() 
    this.traerImagenPago()
    this.ordenaMostrar = e.row.data
    this.ordenaMostrar.fecha_orden = e.row.data.fecha_orden
    var telefono= this.ordenaMostrar.celular.toString()
    if(telefono.length ===9){
      this.primerdigito="0"
    }
    var ced= this.ordenaMostrar.cedula.toString()
    if(ced.length ===9){
      this.digito="0"
    }

    this.popupListaProductos = true;
    //this.nombreTienda = (e.row.data.nombre_ti).toUpperCase();
  }

  traerProductosPorOrden(){
    this._productoPorOrdenService.traerListadoPorOrden(this.nuevaOrden).subscribe(
      (res) => { 
        this.productosPorOrdenDTO = res as ProductosPorOrdenDTO[];
        this.calcularTotal();
        console.log(this.productosPorOrdenDTO)
      },
      (err) => {  Swal.fire("error")} 
    )
  }
/*   traerDatosTienda(){
    this._tiendaService.obtener_datos_tienda_porid(this.datosTienda).subscribe(
      (res) => { 
        var tiendas = res as Tienda[];
        this.datosTienda = tiendas[0];
        this.envio=this.datosTienda.valor_envio
        this._IVA=  Number((0.12 * this.sUBTOTAL).toFixed(2))
        var subsinenvio=Number((this.sUBTOTAL+ this._IVA ).toFixed(2))
        this.totalCompra= Number((this.sUBTOTAL+ this._IVA + this.envio).toFixed(2))
        
        console.log(this.datosTienda)
      },
      (err) => {  Swal.fire("Error al guardar","Su producto no pudo ser agregado","error")} 
    )
  } */

  calcularTotal(){
    this.sUBTOTAL=0
    this.totalCompra = 0;
    this._IVA=0;
    this.productosPorOrdenDTO.forEach(element=>{
      element.total_producto = element.cantidad * element.precio_producto
      this.sUBTOTAL=this.sUBTOTAL + element.total_producto
    })
    this._IVA=  Number((0.12 * this.sUBTOTAL).toFixed(2))
    var subsinenvio=Number((this.sUBTOTAL+ this._IVA ).toFixed(2))
    this.envio=this.ordenaMostrar.total - subsinenvio
    this.totalCompra= Number((this.sUBTOTAL+ this._IVA + this.envio).toFixed(2))
  }

  
   mostrarSecProducto(numero : number){
    if(numero == 1) {
      this.seccionListActivas= true;
      this.seccionTodasordenes = false;
    }
      
    else if(numero = 2){
     this.seccionListActivas= false;
      this.seccionTodasordenes = true;
    }


  }
}
