import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import DataSource from 'devextreme/data/data_source';
import { iif } from 'rxjs';
import { DatosEnvio } from 'src/app/clases/datosEnvio';
import { DatosPago, DatosPagopresentacion } from 'src/app/clases/datosPago';
import { Met_pag_tienda } from 'src/app/clases/metodopagotienda';
import { OrdenCompra } from 'src/app/clases/ordenCompra';
import { PagoPorOrden } from 'src/app/clases/pagoPorOrden';
import { Producto } from 'src/app/clases/producto';
import { ProductosPorOrdenDTO } from 'src/app/clases/productosOrdenCompra';
import { Tienda } from 'src/app/clases/tienda';
import { Usuario } from 'src/app/clases/usuario';
import { AuthenService } from 'src/app/services/authen.service';
import { DatoscuentabancoService } from 'src/app/services/cuentabancaria.service';
import { MetodopagotiendaService } from 'src/app/services/metodopagotienda.service';
import { OrdenCompraService } from 'src/app/services/ordenCompra.service';
import { PagoPorOrdenService } from 'src/app/services/pagoPorOrden.service';
import { ProductoPorOrdenService } from 'src/app/services/productoPorOrden.service';
import { ProductoService } from 'src/app/services/productos.services';
import { TiendaService } from 'src/app/services/tienda.service';
import { DatePipe } from '@angular/common'
import Swal from 'sweetalert2';
import { runInThisContext } from 'vm';
import { Productos } from '../usuario-vendedor/usuario-vendedor.component';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {
  @Input() mostrarMenu : boolean = true;
  mostrarPaso1 = true;
  sUBTOTAL = 0;
  _IVA=0;
  totalCompra = 0;
  popupVisible = false;
  mostrarPaso2 = false;
  newDatosEnvio : DatosEnvio = new DatosEnvio();
  productoMostrado: Producto = new Producto();
  disablePago2 = false;
  productotemproral: Producto = new Producto();
  listapro : Producto []=[]
  listaprocategoria : Producto []=[] 
  isLoged = false;
  nombreUsuario = ""
  usuarioLogueado : Usuario = new Usuario();
  dataContactoDirecto = false;
  dataTransferencia = false; 
  imagenPago =""
  isPago1 = false
  isPago2 = false
  isPago3 = false
  existecarrito=false
  contadorcarrito=0
  idTienda = 0
  contador = 0
  hola=""
  fecha= new Date()
  popupaceptarcantidad=false
  productorecibido: Producto = new Producto();
  productoaenviar: Producto = new Producto();
  camposedicion=false
  comprobarcedula:any ;
  envio=0
  datosPago : DatosPago = new DatosPago()
  listaDatosCuenta : DatosPagopresentacion [] = []


  ordenes: OrdenCompra[] = []; 
  productosPorOrdenDTO: ProductosPorOrdenDTO[] = [];
  producactualizarPorOrdenDTO: ProductosPorOrdenDTO =new ProductosPorOrdenDTO; 
  listadoMetodosPago : Met_pag_tienda[] = []; 

  productos: Producto[] = []; 
  cedula = ""
  nuevaOrden : OrdenCompra = new OrdenCompra()
  datosTienda : Tienda = new Tienda();
  mostrarnohaycuenta=false

  constructor(private router: Router,
        public authenService : AuthenService,
        public _ordenCompraService : OrdenCompraService,
        public _productoPorOrdenService : ProductoPorOrdenService,
        public _metodoPagoTienda : MetodopagotiendaService,
        public _tiendaService : TiendaService,
        public _datosPagoService : DatoscuentabancoService,
        public _pagoPorOrdenService : PagoPorOrdenService,
        public _productoService: ProductoService
        ) { }

  ngOnInit(): void {
    this.cargarUsuarioLogueado();
    //this.calcularTotal();
    /*  this.productoMostrado = this.productos[0];  */
  }

  cargarUsuarioLogueado() {
    new Promise((res, err) => {
      this.cedula = localStorage.getItem("cedulaUser") ?? "";
      this.authenService.getUserLogueado(this.cedula)
        .subscribe(
          res => {
            var arreglo = res as Usuario[];
            this.isLoged = true;
            this.usuarioLogueado = arreglo[0];
            var array = this.usuarioLogueado.nombres.split(" ");
            this.nombreUsuario = array[0];
            this.nuevaOrden.cedula = this.usuarioLogueado.cedula
            this.traerOrdenCompraUsuario()
          },
          err => {})
    });
  }

  traerOrdenCompraUsuario(){

    this._ordenCompraService.traerOrdenPorUsuario(this.nuevaOrden).subscribe(
      (res) => { 
        var lista = res as OrdenCompra[];
        if(lista.length != 0){
          this.nuevaOrden = lista[0]
          this.nuevaOrden.id_metodo_pago_tienda=0
          this.nuevaOrden.nombres = this.usuarioLogueado.nombres + " " + this.usuarioLogueado.apellidos
          this.nuevaOrden.cedula_envio = ""+ this.usuarioLogueado.cedula
          
          this.nuevaOrden.celular = ""+this.usuarioLogueado.celular
          console.log("es la longitud del celular ",this.nuevaOrden.celular.length)
          if(this.nuevaOrden.celular.length ==9){
            this.nuevaOrden.celular = "0"+ this.usuarioLogueado.celular
          }
          if(this.nuevaOrden.cedula_envio.length ==9){
            this.nuevaOrden.cedula_envio = "0"+ this.usuarioLogueado.cedula
          }
          this.nuevaOrden.direccion = this.usuarioLogueado.direccion 
          this.traerProductosPorOrden()
        } 
      },
      (err) => {  Swal.fire("Error al guardar","Su producto no pudo ser agregado","error")} 
    )
  }

  traerProductosPorOrden(){
    this._productoPorOrdenService.traerListadoPorOrden(this.nuevaOrden).subscribe(
      (res) => { 
        this.productosPorOrdenDTO = res as ProductosPorOrdenDTO[];
        if(this.productosPorOrdenDTO.length !=0){
          this.existecarrito=true
          this.contadorcarrito=this.productosPorOrdenDTO.length
        }else{
          this.existecarrito=false
        }
        this.calcularTotal();
      },
      (err) => {  Swal.fire("Error al guardar","Su producto no pudo ser agregado","error")} 
    )
  }

  traerDatosTienda(){
    this._tiendaService.obtener_datos_tienda_porid(this.datosTienda).subscribe(
      (res) => { 
        var tiendas = res as Tienda[];
        this.datosTienda = tiendas[0];
        this.envio=this.datosTienda.valor_envio
        this._IVA=  Number((0.12 * this.sUBTOTAL).toFixed(2))
        this.totalCompra= Number((this.sUBTOTAL+ this._IVA + this.envio).toFixed(2))
        
        console.log(this.datosTienda)
      },
      (err) => {  Swal.fire("Error al guardar","Su producto no pudo ser agregado","error")} 
    )
  }

  traerDatosCuentasBancarias(){
    this._datosPagoService.consultardatosbancarios(this.datosPago).subscribe(
      (res) => { 
        this.listaDatosCuenta = res as DatosPagopresentacion[];
        if(this.listaDatosCuenta.length==0)
          this.mostrarnohaycuenta=true
        else
        this.mostrarnohaycuenta=false
      },
      (err) => {  Swal.fire("error")} 
    )
  }

  traerMetodosPagoTienda(){
    var metodoPago = new Met_pag_tienda()
    metodoPago.id_tienda = this.idTienda
    this._metodoPagoTienda.consultarmetodopagotienda(metodoPago).subscribe(
      (res) => { 
        this.listadoMetodosPago=[]
        this.listadoMetodosPago = res as Met_pag_tienda[];
        if(this.listadoMetodosPago.length ==0){
          this.isPago1=true;
          this.isPago2=true;
          this.isPago3=true;

        }else{
          this.validarMetodos();
        }
        
      },
      (err) => {  Swal.fire("Error al guardar","Su producto no pudo ser agregado","error")} 
    )
    this.datosTienda.id_tienda = this.idTienda.toString()
    this.traerDatosTienda()
  }

  validarMetodos(){
    this.listadoMetodosPago.forEach(element=>{
      if(element.id_metodo_pago == 1) {
        this.isPago1 = element.estado_metodo==1 ? false : true
        this.datosPago.id_metodo_pago_tienda = element.id_metodo_pago_tienda
        this.traerDatosCuentasBancarias()
      }
      else if(element.id_metodo_pago == 2) 
        this.isPago2 = element.estado_metodo==1 ? false : true
      else if(element.id_metodo_pago == 3) 
        this.isPago3 = element.estado_metodo==1 ? false : true
    }) 
  }

  habilitarcampos(){
    this.nuevaOrden.nombres = ""
    this.nuevaOrden.cedula_envio = ""
    this.nuevaOrden.celular = ""
    this.nuevaOrden.direccion = ""
    this.camposedicion= true

  }

  verCarrito(){
    this.router.navigate(['/carrito-compras']);
  }


  actualizarcantidad(product : ProductosPorOrdenDTO){
    this.popupaceptarcantidad=false
    this.productoaenviar.id_producto= product.id_producto.toString();
    this._productoService.obtener_productosporid(this.productoaenviar).subscribe(
      (res) => {this.productorecibido= res[0];
                if(product.cantidad > this.productorecibido.stock){
                  this.popupaceptarcantidad=true
                  
                  this.producactualizarPorOrdenDTO = product
                }else{
                  this.actualizarCantidadProducto(product)
                }
      
      },
      (err) => {  Swal.fire("error")} 
    )
  }

  poputaceptacioncantidad(){
    this.calcularTotal();
    this.popupaceptarcantidad=false
    this.producactualizarPorOrdenDTO.cantidad= this.productorecibido.stock

    this._productoPorOrdenService.actualizarProducto(this.producactualizarPorOrdenDTO).subscribe(
      (res) => { },
      (err) => {  Swal.fire("error")} 
    )
   /*  this.nuevoProductoOrden.cantidad = this.productoAComprar.stock;
    this.calcularTotalOrden();
    this.popupaceptarcantidad=false;
    this.popupCompra=false;
    this.validarTiendaProducto();*/

  }
  poputrechazarcantidad(){
    this.traerProductosPorOrden()
    this.popupaceptarcantidad=false;

   /*  this.popupaceptarcantidad=false;
    this.popupCompra=false;*/

  } 

  actualizarCantidadProducto(product : ProductosPorOrdenDTO){
    this._productoPorOrdenService.actualizarProducto(product).subscribe(
      (res) => { this.calcularTotal();},
      (err) => {  Swal.fire("error")} 
    )
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
  }


  calcularTotal(){
    this.sUBTOTAL=0
    this.totalCompra = 0;
    this.productosPorOrdenDTO.forEach(element=>{
      this.idTienda = element.id_tienda
      console.log("este es el id tienda"+this.idTienda)
      element.total_producto = element.cantidad * element.precio_producto
      this.sUBTOTAL=this.sUBTOTAL + element.total_producto
      /* this.totalCompra = this.totalCompra + element.total_producto */
    }) 
    this.contador++
    if(this.contador >= 1)
      this.traerMetodosPagoTienda()
      /* LOS VALORES DE IVA - SUBTOTAL + ENVIO , ESTAN AL MOMENTO DE TRAER LA TIENDA */
      
  }

 


  logout() {
    localStorage.removeItem("cedulaUser");
    localStorage.removeItem("token");
    localStorage.removeItem("logged");
    this.router.navigate(["/login"]);
  }

  seguirComprando(){
    var tiendaId = this.idTienda; // setear el Id de ña tienda perteneciente a un producto de la orden
    this.router.navigate(['/productos-tienda'], { queryParams: { id: tiendaId } });
  }

  mostrarPopupProducto(productoOrden : ProductosPorOrdenDTO){
    // LLamar al metodo obtener producto y traer los datos 
    //asignarle a la variable productoEncontrado
    this.popupVisible = true;
    
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
    if(num == 3){
      this.dataContactoDirecto = true;
      this.dataTransferencia = false;
    }else if(num == 2){
      this.dataContactoDirecto = false;
      this.dataTransferencia = false;
    }else if(num == 1){
      this.dataContactoDirecto = false;
      this.dataTransferencia = true;
    }
    var idMetodoPago = this.listadoMetodosPago.find(element=> element.id_metodo_pago == num)?.id_metodo_pago_tienda ?? 0
    this.nuevaOrden.id_metodo_pago_tienda = idMetodoPago;
  }

  validarImagenPago(){
    if(this.dataTransferencia && this.imagenPago == "" && this.mostrarnohaycuenta==false)
      Swal.fire("No existe comprobante","Ingrese su comprobante de Pago","error")
    else if(this.mostrarnohaycuenta && this.dataTransferencia)
    Swal.fire("No hay cuentas bancarias habilitadas por el momento","intente con otro método de pago","error")
    else
      this.realizarPedido()
    
  }

  cancelarPedido(){
    Swal.fire({
      title: 'Cancelar Orden',
      text: "Está seguro de anular su pedido",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText :'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.nuevaOrden.id_estado_pedido = 5 //estado cancelado
        this._ordenCompraService.actualizarEstadoOrden(this.nuevaOrden).subscribe(
          (res) => { 
            Swal.fire({
              title: 'Orden Cancelada',
              text: "Su orden ha sido anulada con éxito",
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(["/principal"]);
              }
            }) 
          },
          (err) => {  Swal.fire("Error al guardar","Error a cancelar su pedido","error")} 
        ) 
      }
    })   
  }

  realizarPedido(){
    Swal.fire({
      title: 'Enviar Pedido',
      text: "Está seguro de enviar su pedido",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Solicitar',
      cancelButtonText :'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.nuevaOrden.id_estado_pedido = 4
        this.nuevaOrden.total = this.totalCompra
        this._ordenCompraService.actualizarOrden(this.nuevaOrden).subscribe(
          (res) => { 
            if(this.dataTransferencia){
              var nuevoPago = new PagoPorOrden()
              nuevoPago.id_orden_compra = this.nuevaOrden.id_orden_compra
              nuevoPago.imagen_comprobante = this.imagenPago
              this._pagoPorOrdenService.registrarPago(nuevoPago).subscribe(
                (res) => { this.mostrarConfirmacion()},
                (err) => { Swal.fire("error")} 
              ) 
            }else
            this.mostrarConfirmacion()
          },
          (err) => {  Swal.fire("Error al guardar","No se puedo enviar su solicitud","error")} 
        ) 
      }
    })  


    
  }

  mostrarConfirmacion(){
    Swal.fire({
      title: 'Correcto',
      text: "Se envió su solicitud de compra",
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Deja tu reseña',
          text:'Ya puedes añadir un comentario a la tienda, dinos cómo fue tu experienca para conocimiento de los demás usuarios',
          showConfirmButton: false,
          timer: 3200
        })
        
        this.router.navigate(["/principal"]);
      }
    }) 
  }

  limpiarimagen(){
    if(this.imagenPago!=""){
      this.imagenPago=""
    }
  }

  redirigir(){
    this.router.navigate(["/principal"]);
  }

  irPerfilUsuario(){
    if(this.usuarioLogueado.id_tipo_usuario == 1)
    this.router.navigate(['/usuarioVendedor']);
    else if(this.usuarioLogueado.id_tipo_usuario == 2)
    this.router.navigate(['/usuarioComprador']);
      
  }

  eliminarRegistro(i: number,  producto : ProductosPorOrdenDTO) {
    Swal.fire({
      title: 'Eliminar Producto',
      text: "Está seguro de eliminar de su carrito el producto "+producto.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText :'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarProducto(producto);
      }
    })    
  }

  eliminarProducto(producto : ProductosPorOrdenDTO){
    this._productoPorOrdenService.eliminarProducto(producto).subscribe(
      (res) => { 
        Swal.fire("Correcto","Su producto fue eliminado con éxito","success")
        this.traerProductosPorOrden()
      },
      (err) => {  Swal.fire("Error al eliminar","Su producto no pudo ser eliminado","error")} 
    ) 
  }

  llamarsubcategorias(opcion:number){
    
    this.productotemproral.id_sub_categoria = opcion
    this._productoService.obtener_porid_subcategorias(this.productotemproral).subscribe(
      (res) => { var lista = res as Producto[];
         this.arreglodeproductosactivos(lista)
                },
      (err) => { }
    )    
  }
  llamarporcategorias(lista1:number[]){
    var cuenta = 0
    var limite = lista1.length
    this.listaprocategoria.splice(0, this.listaprocategoria.length)
    for (let i in lista1){
      this.productotemproral.id_sub_categoria = lista1[i],
      this._productoService.obtener_porid_subcategorias(this.productotemproral).subscribe(
        (res) => {  var lista = res as Producto[];
          cuenta++
          for( let j in lista){
            this.listaprocategoria.push(lista[j])
            if(cuenta === lista1.length){
              this.arreglodeproductosactivos(this.listaprocategoria)
            }
          }
                },
        (err) => { }
    ) 
    }     
    
  }
 
  arreglodeproductosactivos(listaproductos:Producto[]){
    this.listapro.splice(0, this.listapro.length)
  
    for (let i in listaproductos){
      if (listaproductos[i].id_estado_pro === 2){
        this.listapro.push(listaproductos[i])
      }
    }
  }

  
  verificarcampos(){
    console.log(this.nuevaOrden.id_metodo_pago_tienda)
    if(this.nuevaOrden.nombres !=="" && this.nuevaOrden.nombres.length >= 8){
      if(this.nuevaOrden.celular !=="" && this.nuevaOrden.celular.length === 10){
        if(this.nuevaOrden.direccion!=="" && this.nuevaOrden.direccion.length >= 8){
          if( this.nuevaOrden.cedula_envio!=="" && this.nuevaOrden.cedula_envio.length === 10 ){
            this.comprobarcedula = this.validarCedula(this.nuevaOrden.cedula_envio);
            if(this.comprobarcedula=== true){
              if(this.nuevaOrden.id_metodo_pago_tienda !=0){
                this.validarImagenPago()
              }else{
                this.mostrarmensajes('Debe seleccionar un método de pago')
              }
              
            }else{
          this.mostrarmensajes('Debe ingresar un número de cédula correcto')
        }
  
          }else{
        this.mostrarmensajes('Por favor indique  el número de cédula')
      }
  
        }else{
        this.mostrarmensajes('Por favor indique su direccion para el envío')
      }
  
      }else{
        this.mostrarmensajes('Por favor indique su número celular para el envío')
      }
      
    }
    else {
      this.mostrarmensajes('Debe llenar el campo nombres')
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

  validarCedula(cedula: string) {
    console.log(cedula)
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

}
