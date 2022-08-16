import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { DxAutocompleteComponent, DxTextBoxComponent } from 'devextreme-angular';
import dxAutocomplete from 'devextreme/ui/autocomplete';
import { transporter } from 'src/app/services/correo/envio_correo';
import { CorreoService } from 'src/app/services/correoServices';
import { Correo, CorreoStock } from 'src/app/clases/Correo';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { runInThisContext } from 'vm';
import { Comentarios, ComentariosDTO } from 'src/app/clases/Comentarios';
import { ComentariosTiendaService } from 'src/app/services/comentarios.service';
import { threadId } from 'worker_threads';
import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  @ViewChild('inputentrada') public inputentrada:DxAutocompleteComponent | undefined;

  listaproductos : Producto []=[]
  listapro : Producto []=[]
  listaprocategoria : Producto []=[]
  nombreUsuario = ""
  listacategorias : Categorias []=[]
  listapresentacioncategorias : Categorias []=[]
  listaprocompleto : Productocompleto []=[]
  listaprocompleto2 : Productocompleto []=[]
  listacompletaproductos : Productocompleto []=[]
  arregloproductosbuscar : Productocompleto []=[]
  nomb=""
  popupVisible = false
  popupTienda = false
  popupCompra = false
  popupaceptarcantidad=false
  inhabilitarboton=false
  existecarrito=false
  poputinformacionpago=false
  productoMostrado : Productocompleto = new Productocompleto()
  productoAComprar : Productocompleto = new Productocompleto()
  nuevaOrden : OrdenCompra = new OrdenCompra();
  nuevoProductoOrden : ProductosPorOrden = new ProductosPorOrden();
  desactivarcarrito=true
 tiendascorre: Tienda[]=[];
  
  totalCompra = 0;
  productotemproral: Producto = new Producto();
  cedula = ""
  ratingValor = 0;
  poputinformaciontienda=false
  tiendapoput: Tienda = new Tienda();
  datosTienda: Tienda = new Tienda();
  productosOrden: ProductosPorOrden[] = [];
  productosOrdenDTO: ProductosPorOrdenDTO[] = [];
  isCorrecto = false
  cantidadcorrecta = false
  buscartienda: Tienda = new Tienda();
  idelatienda="";
  isLoged = false;
  mensajeError = ""
  mostrarLoading=false
  mensajeLoading=""
  contadorcarrito=0
  contadortienda=0
  rating3 = 0;
  usuarioLogueado : Usuario = new Usuario();
  correo: Correo = new Correo();
  form: FormGroup ;
  habilitarcomentario=false;
  TraerComentariosTiendaa : ComentariosDTO [] = [];
  comentario_idtienda: Comentarios = new Comentarios();
  nuevo_comentario: Comentarios = new Comentarios();
  poputcalificatienda=false;
  mensajecalifa="";
  existencomentarios=true;
  ordencomentario: Tienda = new Tienda;
  contadorvotos=0
  primerdigito="";
  correotienda: CorreoStock = new CorreoStock();
  consultarcorreotienda: Tienda = new Tienda();

  constructor(public router: Router,
    public _productoService: ProductoService,
    public authenService : AuthenService,
    public userService: UsuarioService,
    public _categoriaService: CategoriaService,
    public _productocomletoService: ProductocompletoService,
    public _productoPorOrdenService: ProductoPorOrdenService,
    public _ordenCompraService: OrdenCompraService,
    public _tiendaService: TiendaService,
    public _correoService: CorreoService,
    public fb: FormBuilder,
    public _comentarioService: ComentariosTiendaService
    ) { 
      
      this.rating3 = 0;
      this.form = this.fb.group({
      rating: ['', Validators.required],
    })}

  ngOnInit(): void {
    this.cargarUsuarioLogueado();
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
            var array = this.usuarioLogueado.nombres.split(" ");
            this.nombreUsuario = array[0];
            this.nuevaOrden.cedula = this.usuarioLogueado.cedula
            this.traerOrdenCompraUsuario();
            this.traerDatosTienda();
            /* this.traerComentariosTienda(); */
            
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
          
        }
          
      },
      (err) => {  Swal.fire("Error al guardar","Su producto no pudo ser agregado","error")} 
    )
  }


  traerProductosPorOrden(){
    this._productoPorOrdenService.traerListadoPorOrden(this.nuevaOrden).subscribe(
      (res) => { 
        
        this.productosOrdenDTO = res as ProductosPorOrdenDTO[];
        if(this.productosOrdenDTO.length !=0){
          this.existecarrito=true
          this.contadorcarrito=this.productosOrdenDTO.length
        }
        else{
          this.existecarrito=false
        }
        
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

  
  mostrarpoputformasdepago(){
    this.poputinformacionpago=true;
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
    if(this.totalCompra==0)
    this.desactivarcarrito=true
    if(this.totalCompra!=0)
    this.desactivarcarrito=false

  }

  validarCantidad(){
    this.isCorrecto = false
    if(this.nuevoProductoOrden.cantidad >0)
      this.isCorrecto = true
    else 
      this.isCorrecto = false
    this.calcularTotalOrden();
    this.nuevoProductoOrden.id_producto = this.productoAComprar.id_producto;
    this.nuevoProductoOrden.precio_producto = this.productoAComprar.precio;
    
    if(this.productoAComprar.stock < this.nuevoProductoOrden.cantidad){
      this.enviarcorreoconinfocliente()
      this.popupaceptarcantidad=true;

    }else{
      this.mensajeError = ""
      this.calcularTotalOrden()
      this.cantidadcorrecta=true;
    }  
  }
  enviarcorreoconinfocliente(){
    this.consultarcorreotienda= new Tienda();
    this.tiendascorre= [];
    this.correotienda.asunto="Actualización stock producto";
    this.consultarcorreotienda.id_tienda= this.productoAComprar.id_tienda.toString();

    this._tiendaService.obtener_datos_tienda_porid(this.consultarcorreotienda).subscribe(
      (res) => { 
        this.tiendascorre = res as Tienda[];
        console.log(this.tiendascorre[0].correo_electronico)
        this.correotienda.email = this.tiendascorre[0].correo_electronico;
        this.correotienda.nombre_producto=this.productoAComprar.nombre;
        this.correotienda.nombre= this.usuarioLogueado.nombres;
        this.correotienda.apellidos=this.usuarioLogueado.apellidos;
        this.correotienda.cantidad=this.nuevoProductoOrden.cantidad.toString();
        this.correotienda.email_cliente=this.usuarioLogueado.correo;
        var telefono= this.usuarioLogueado.celular.toString()
        if(telefono.length ===9){
          var celular="0"+this.usuarioLogueado.celular.toString()}
          else{ var celular=this.usuarioLogueado.celular.toString() }
        this.correotienda.celular_cliente=celular;
        var fech=new Date().toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })
        this.correotienda.fecha= fech
        this._correoService.enviar_correo_a_tienda(this.correotienda).subscribe(
          (res) => { console.log("estoy en la respuesta"+res);
            
          },
          (err) => {  Swal.fire("Error","No se pudo enviar el correo","error")})
       
        
      },
      (err) => {  } )
    


  }

  poputaceptacioncantidad(){
    this.nuevoProductoOrden.cantidad = this.productoAComprar.stock;
    this.calcularTotalOrden();
    this.popupaceptarcantidad=false;
    this.popupCompra=false;
    this.validarTiendaProducto();

  }
  poputrechazarcantidad(){
    this.popupaceptarcantidad=false;
    this.popupCompra=false;
  }

 

  validarTiendaProducto(){
    this.validarCantidad();
    if(this.cantidadcorrecta == true){
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
    
  }

  solicitarProducto(){
    this.nuevaOrden.id_estado_pedido = 1
    this.nuevaOrden.id_metodo_pago_tienda = 11
    this.nuevaOrden.celular="0"
    if(this.nuevaOrden.id_orden_compra == 0){
      var fecha = new Date()
      console.log("si entre")
      this.nuevaOrden.fecha_orden= new Date(this.nuevaOrden.fecha_orden.toISOString())
      this._ordenCompraService.registrar(this.nuevaOrden).subscribe(
        (res) => { 
          var productoOrden = res;
          this.nuevoProductoOrden.id_orden_compra = productoOrden.insertId
          this._productoPorOrdenService.registrar(this.nuevoProductoOrden).subscribe(
            (res) => { 
              this.popupCompra = false;
              this.traerOrdenCompraUsuario()
              /* this.traerProductosPorOrden() */
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

  mostrarPopupTienda(element : Productocompleto){
    this.nuevo_comentario = new Comentarios
    this.form.controls['rating'].setValue(null);
    this.datosTienda= new Tienda(); 
    this.mensajeLoading = "Obteniendo datos";
    this.mostrarLoading = true;
    this.tiendapoput.id_tienda = element.id_tienda.toString()
    this._tiendaService.obtener_datos_tienda_porid(this.tiendapoput).subscribe(
      (res) => {
        var tienda = res as Tienda[]; 
        this.datosTienda = tienda[0];
        var telefono= this.datosTienda.telefono.toString()
        if(telefono.length ===9){
          this.primerdigito="0"
        }
        this.popupTienda = true;
        this.mostrarLoading = false;
        if(this.contadortienda==0){
          this.actualizarContadorTienda(this.datosTienda);
          this.consultarordenesparacomentario(this.datosTienda.id_tienda.toString())
          this.mostrarPopupTienda(element);
          this.traerComentariosTienda(this.datosTienda.id_tienda.toString())
          this.contadortienda=1;
        }else{
          this.consultarordenesparacomentario(this.datosTienda.id_tienda.toString())
          this.actualizarContadorTienda(this.datosTienda); 
          this.traerComentariosTienda(this.datosTienda.id_tienda.toString())   
        }


           
      },
      (err) => { } )
      
   
  }

  consultarordenesparacomentario(id: string){
    this.ordencomentario = new Tienda
    this.ordencomentario.id_tienda= id;
    this.ordencomentario.cedula= this.usuarioLogueado.cedula;
    this._ordenCompraService.obtenerOrdenesPorusuarioytienda(this.ordencomentario).subscribe(
      (res) => {
        var ordenesusariosentienda= res as OrdenCompra[];
        if(ordenesusariosentienda.length >0){
          this.habilitarcomentario=false
        }
        else{
          this.habilitarcomentario=true
        }   
      },
      (err) => { } )


  }

  traerComentariosTienda(id : string){
    this.TraerComentariosTiendaa=[];
    this.comentario_idtienda.id_tienda= id;
    this._comentarioService.traer_comentarios_xtienda(this.comentario_idtienda).subscribe(
      (res) => {
        this.TraerComentariosTiendaa = res as ComentariosDTO[];
        console.log(this.TraerComentariosTiendaa.length)
        if(this.TraerComentariosTiendaa.length ==0){
          this.ratingValor=0;
          this.existencomentarios=false;
          this.contadorvotos=0;
        }else{
          this.existencomentarios=true;
          console.log(this.TraerComentariosTiendaa);
          var suma=0;
          this.contadorvotos=0;
          this.TraerComentariosTiendaa.forEach(element=>{
            suma= suma + element.puntuacion
            this.contadorvotos++
          })
          var promedio=suma/this.contadorvotos;
          console.log(promedio)
          this.ratingValor=Math.round(promedio);

        }

      },
      (err) => { } )
  }


  cerrarpoput(){
    this.poputcalificatienda=false;
  }

registrarcomentario(){
  this.mensajecalifa="";
  var rati= this.form.value.rating
  if (rati==null  || rati==0){
    this.mensajecalifa="Debe otorgar una calificación a la tienda"
    this.poputcalificatienda=true;
  }
  if(this.nuevo_comentario.comentario==""){
    this.mensajecalifa="Debe escribir un comentario sobre la tienda"
    this.poputcalificatienda=true;
  }
  if(rati!= null && rati!=0 && this.nuevo_comentario.comentario!=""){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var toda = dd + '/' + mm + '/' + yyyy;
    this.nuevo_comentario.id_tienda= this.datosTienda.id_tienda;
    this.nuevo_comentario.cedula=this.usuarioLogueado.cedula;
    this.nuevo_comentario.puntuacion=rati
    /* this.nuevo_comentario.comentario="ESTE ES EL NUEVO COMENTARIO"; */
    /* let date: Date = new Date(toda); */
    this.nuevo_comentario.fecha= toda;
    this._comentarioService.registrar_comentarios(this.nuevo_comentario).subscribe(
      (res) => {
        this.traerComentariosTienda(this.nuevo_comentario.id_tienda.toString())
      this.nuevo_comentario= new Comentarios
      this.form.controls['rating'].setValue(null);
       
      },
      (err) => { } )

  }
 

}


  mostrarPopupCompra(producto : Productocompleto){
    this.isCorrecto = false
    this.nuevoProductoOrden.cantidad=0
    this.nuevoProductoOrden.total_producto=0
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



  mostrarinfotienda(){
    this.poputinformaciontienda=true
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
      if(this.nomb.toLowerCase() == this.listacompletaproductos[i].nombre.toLocaleLowerCase()){
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
        this.arreglo_productos_buscar();

        console.log(this.listacompletaproductos)
       
              },
      (err) => { }
  )

  }
  arreglo_productos_buscar(){
    this.arregloproductosbuscar= [];
    for (let i in this.listacompletaproductos){
      
      if(i=="0"){
        this.arregloproductosbuscar.push(this.listacompletaproductos[i])
      }
      else{
        var contado=0
        for(let j in this.arregloproductosbuscar){
          if(this.listacompletaproductos[i].nombre.toLowerCase() == this.arregloproductosbuscar[j].nombre.toLowerCase()){
            contado=contado+1;
            
          }
        }
        if(contado==0){
          this.arregloproductosbuscar.push(this.listacompletaproductos[i])
        }
        
     
      }

    }

  }


  ponerenelinpute(){
   
    if( this.inputentrada!=undefined)
      this.inputentrada.instance.focus();
  
  }


  itemClick(data:any) {
    const item = data.itemData;

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

