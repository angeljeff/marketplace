import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/clases/producto';
import { ProductoService } from 'src/app/services/productos.services';
import { ArrayMenu} from './menu';
import { AuthenService } from 'src/app/services/authen.service';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Categorias } from 'src/app/clases/categorias';
import { CategoriaService } from 'src/app/services/categorias.service';
import { ProductocompletoService } from 'src/app/services/productoscompletos';
import { Productocompleto } from 'src/app/clases/Productocompleto';
import { OrdenCompra } from 'src/app/clases/ordenCompra';
import { Tienda } from 'src/app/clases/tienda';
import Swal from 'sweetalert2';
import { TiendaService } from 'src/app/services/tienda.service';
import { ProductosPorOrden, ProductosPorOrdenDTO } from 'src/app/clases/productosOrdenCompra';
import { ProductoPorOrdenService } from 'src/app/services/productoPorOrden.service';
import { OrdenCompraService } from 'src/app/services/ordenCompra.service';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  listaproductos : Producto []=[]
  listapro : Producto []=[]
  listaprocategoria : Producto []=[]
  nombreUsuario = ""
  listacategorias : Categorias []=[]
  listapresentacioncategorias : Categorias []=[]
  listaprocompleto : Productocompleto []=[]
  listaprocompleto2 : Productocompleto []=[]
  listacompletaproductos : Productocompleto []=[]
  nomb=""
  popupVisible = false
  popupTienda = false
  popupCompra = false
  inhabilitarboton=false
  productoMostrado : Productocompleto = new Productocompleto()
  productoAComprar : Productocompleto = new Productocompleto()
  nuevaOrden : OrdenCompra = new OrdenCompra();
  nuevoProductoOrden : ProductosPorOrden = new ProductosPorOrden();
  
  totalCompra = 0;
  productotemproral: Producto = new Producto();
  cedula = ""
  tiendapoput: Tienda = new Tienda();
  datosTienda: Tienda = new Tienda();
  productosOrden: ProductosPorOrden[] = [];
  productosOrdenDTO: ProductosPorOrdenDTO[] = [];
  isCorrecto = false
  buscartienda: Tienda = new Tienda();
  idelatienda="";
  isLoged = false;
  mensajeError = ""
  usuarioLogueado : Usuario = new Usuario();
  constructor(public router: Router,
    public _productoService: ProductoService,
    public authenService : AuthenService,
    public userService: UsuarioService,
    public _categoriaService: CategoriaService,
    public _productocomletoService: ProductocompletoService,
    public _productoPorOrdenService: ProductoPorOrdenService,
    public _ordenCompraService: OrdenCompraService,
    public _tiendaService: TiendaService) { }

  ngOnInit(): void {
    this.cargarUsuarioLogueado();
    this.mandarMensaje();
    this.mostrarproductos();

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
            console.log(this.usuarioLogueado );
            var array = this.usuarioLogueado.nombres.split(" ");
            this.nombreUsuario = array[0];
            this.nuevaOrden.cedula = this.usuarioLogueado.cedula
            this.traerOrdenCompraUsuario();
            this.traerDatosTienda();
          },
          err => {})
    });
  }
  traerDatosTienda(){
    this.buscartienda.cedula= this.usuarioLogueado.cedula
    this._tiendaService.obtener_datos_tienda(this.buscartienda).subscribe(
       (res) => {
         var tienda = res as Tienda[];
         if(tienda.length != 0){
           if(tienda[0].id_estado_tienda == 1){
             this.inhabilitarboton = true;
             this.idelatienda=tienda[0].id_tienda;

             
  
           }
          
         }
           
       },
       (err) => { } )
     
   }

  traerOrdenCompraUsuario(){
    this._ordenCompraService.traerOrdenPorUsuario(this.nuevaOrden).subscribe(
      (res) => { 
        var lista = res as OrdenCompra[];
        if(lista.length != 0){
          this.nuevaOrden = lista[0]
          this.traerProductosPorOrden()
          console.log(this.nuevaOrden)
        }
          
      },
      (err) => {  Swal.fire("Error al guardar","Su producto no pudo ser agregado","error")} 
    )
  }

  traerProductosPorOrden(){
    this._productoPorOrdenService.traerListadoPorOrden(this.nuevaOrden).subscribe(
      (res) => { 
        this.productosOrdenDTO = res as ProductosPorOrdenDTO[];
        this.calcularTotal();
      },
      (err) => {  Swal.fire("Error al guardar","Su producto no pudo ser agregado","error")} 
    )
  }

  logout() {
    localStorage.removeItem("cedulaUser");
    localStorage.removeItem("token");
    localStorage.removeItem("logged");
    this.router.navigate(["/login"]);
  }

  verCarrito(){
    this.router.navigate(['/carrito-compras']);
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

  calcularTotal(){
    this.totalCompra = 0;
    this.productosOrdenDTO.forEach(element=>{
      element.total_producto = element.cantidad * element.precio_producto
      this.totalCompra = this.totalCompra + element.total_producto
    }) 
  }

  validarCantidad(){
    if(this.nuevoProductoOrden.cantidad >0)
      this.isCorrecto = true
    else 
      this.isCorrecto = false
    this.nuevoProductoOrden.id_producto = this.productoAComprar.id_producto;
    this.nuevoProductoOrden.precio_producto = this.productoAComprar.precio;
    if(this.productoAComprar.stock < this.nuevoProductoOrden.cantidad){
      this.mensajeError = "La cantidad solicitada excede el stock disponible del producto, se asignó por defecto el stock disponible"
      this.nuevoProductoOrden.cantidad = this.productoAComprar.stock;
      this.calcularTotalOrden()
    }else{
      this.mensajeError = ""
      this.calcularTotalOrden()
    }  
  }

  validarTiendaProducto(){
    if(this.productosOrdenDTO.length == 0)
      this.solicitarProducto()
    else{
      if(this.productosOrdenDTO[0].id_tienda == this.productoAComprar.id_tienda){
        var existe = this.productosOrdenDTO.find(element => element.id_producto == this.nuevoProductoOrden.id_producto)
        if(existe == undefined){   
          this.solicitarProducto()
        }else{
          this.popupCompra = false;
          Swal.fire("Producto no agregado","Ya existe este producto en su lista","error")
        }
        
      }else{
        this.popupCompra = false
        Swal.fire("Producto no agregado","Tiene una orden de compra pendiente en otra tienda,por favor finalicela para poder efectuar otro pedido de otra tienda","error")
      }
    }
    
    
  }

  solicitarProducto(){
    this.nuevaOrden.id_estado_pedido = 1
    this.nuevaOrden.id_metodo_pago_tienda = 11
    if(this.nuevaOrden.id_orden_compra == 0){
      this._ordenCompraService.registrar(this.nuevaOrden).subscribe(
        (res) => { 
          var productoOrden = res;
          this.nuevoProductoOrden.id_orden_compra = productoOrden.insertId
          this._productoPorOrdenService.registrar(this.nuevoProductoOrden).subscribe(
            (res) => { 
              this.popupCompra = false;
              this.traerProductosPorOrden()
              Swal.fire({
                title: 'Producto Agregado',
                text: "El producto se agregó a su carrito de compras",
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Seguir comprando',
                cancelButtonText :'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.seguirComprando();
                }
              })
              
            },
            (err) => {  Swal.fire("Error al guardar","Su producto no pudo ser agregado","error")} 
          )
        },
        (err) => { } 
      )
    }else{
      this.nuevoProductoOrden.id_orden_compra = this.nuevaOrden.id_orden_compra
      this._productoPorOrdenService.registrar(this.nuevoProductoOrden).subscribe(
        (res) => { 
          this.popupCompra = false;
          this.traerProductosPorOrden()
          Swal.fire({
            title: 'Producto Agregado',
            text: "El producto se agregó a su carrito de compras",
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Seguir comprando',
            cancelButtonText :'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              this.seguirComprando();
            }
          })
          
        },
        (err) => {  Swal.fire("Error al guardar","Su producto no pudo ser agregado","error")} 
      )
    }
 
  }

  calcularTotalOrden(){
    console.log("entreeee")
    this.nuevoProductoOrden.total_producto = this.nuevoProductoOrden.cantidad * this.nuevoProductoOrden.precio_producto 
    console.log(this.nuevoProductoOrden)
  }

  mostrarPopup(producto : Productocompleto){
    this.productoMostrado = producto
    this.popupVisible = true;
    var nuevoProducto = new Producto()
    nuevoProducto.id_producto = producto.id_producto.toString()
    this.actualizarContadorProducto(nuevoProducto)
  }

  mostrarPopupTienda(idTienda : number){
    this.popupTienda = true;
    this.tiendapoput.id_tienda = idTienda.toString()
    this._tiendaService.obtener_datos_tienda_porid(this.tiendapoput).subscribe(
      (res) => {
        var tienda = res as Tienda[];
        this.datosTienda = tienda[0]     
      },
      (err) => { } )
    
    this.actualizarContadorTienda(this.datosTienda)
   
  }

  mostrarPopupCompra(producto : Productocompleto){
    this.nuevoProductoOrden.cantidad=0
    this.nuevoProductoOrden.total_producto=0
    console.log(producto)
    if(this.isLoged){
      this.popupCompra = true;
      this.productoAComprar = producto;



    }else{
      Swal.fire({
        title: 'Alerta',
        text: "Necesita estar logeado para realizar esta acción",
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'Ir a Login',
        cancelButtonText :'Cerrar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      }) 
    }
    
  }

  actualizarContadorProducto(producto: Producto){
    this._productoService.obtener_productosporid(producto).subscribe(
      (res) => { 
          var lista = res as Producto[];
          lista[0].contador = lista[0].contador+1
          this._productoService.actualizarContador(lista[0]).subscribe(
            (res) => { console.log("actualice contador",lista[0])},
            (err) => { }
          ) 
        },
      (err) => { }
    )     
  }

  actualizarContadorTienda(tienda: Tienda){
    console.log(tienda +"ff")
    tienda.contador = tienda.contador+1
    this._tiendaService.actualizarContador(tienda).subscribe(
      (res) => { console.log("actualice contador",tienda)},
      (err) => { }
    )      
  }

  seguirComprando(){
    var tiendaId= Number(this.productoAComprar.id_tienda); // setear el Id de ña tienda perteneciente a un producto de la orden
    this.router.navigate(['/productos-tienda'], { queryParams: { id: tiendaId } });
  }

  verProductosTienda(idTienda : string){
    var tiendaId= Number(idTienda)
    this.router.navigate(['/productos-tienda'], { queryParams: { id: tiendaId } });
  }


  mandarMensaje(){

  }

  irPerfilUsuario(){
    if(this.usuarioLogueado.id_tipo_usuario == 1)
      this.router.navigate(['/usuarioVendedor']);
    else if(this.usuarioLogueado.id_tipo_usuario == 2)
      this.router.navigate(['/usuario-Comprador']);
    else if(this.usuarioLogueado.id_tipo_usuario == 3)
      this.router.navigate(['/usuarioAdministrador']);
      
  }

  buscarproducto(){
    this.listaprocompleto=[]
    for (let i in this.listacompletaproductos){
      if(this.nomb == this.listacompletaproductos[i].nombre){
        console.log("entre" + i)
     
        this.listaprocompleto.push(this.listacompletaproductos[i])

      }
    }
  }
  traerListadocategorias(){
    this._categoriaService.traerListaCtegorias().subscribe(
      (res) => { this.listacategorias = res as Categorias[];},
      (err) => { }
    )
  }

  llamarsubcategorias(opcion:number){
    this.listaprocompleto.splice(0, this.listaprocompleto.length)
    this.productotemproral.id_sub_categoria = opcion
    this._productocomletoService.obtener_productosporidsub(this.productotemproral).subscribe(
      (res) => { this.listaprocompleto = res as Productocompleto[]},
      (err) => { }
    )
  }
  llamarporcategorias(lista1:number[]){
    var cuenta = 0
    var limite = lista1.length
    this.listaprocompleto.splice(0, this.listaprocompleto.length)
    for (let i in lista1){
      this.productotemproral.id_sub_categoria = lista1[i],
      this._productocomletoService.obtener_productosporidsub(this.productotemproral).subscribe(
        (res) => { var lista = res as Productocompleto[]
          cuenta++
          for( let j in lista){
            this.listaprocompleto.push(lista[j])
            this.iniciodepagina()
          }},
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
    console.log("esta es el arreglo final", this.listapro)
  }

iniciodepagina(){
  window.scrollTo(0,0)
}
mostrardatostienda(){
  this.listaprocompleto.splice(0, this.listaprocompleto.length)
  this.listacompletaproductos.splice(0, this.listacompletaproductos.length)
  this._productocomletoService.traerpro_completos().subscribe(
    (res) => {  this.listaprocompleto = res as Productocompleto[];
      this.listacompletaproductos= this.listaprocompleto
      console.log(this.listacompletaproductos)
     
            },
    (err) => { }
)

}


  mostrarproductos(){
    this.listaprocompleto.splice(0, this.listaprocompleto.length)
    this.listacompletaproductos.splice(0, this.listacompletaproductos.length)
    this._productocomletoService.traerpro_completos().subscribe(
      (res) => {  this.listaprocompleto = res as Productocompleto[];
        this.listacompletaproductos= this.listaprocompleto
        console.log(this.listacompletaproductos)
       
              },
      (err) => { }
  )

  }



  itemClick(data:any) {
    const item = data.itemData;

    console.log(item);
    switch (item.name) {
      case "Item1":
        this.router.navigate(["/pagina"]);
        break;
      case "Item2":
      this.router.navigate(["/pagina3"]);
      break;
    }    

    if (item.price) {
      
    }
  }

 
 
}
