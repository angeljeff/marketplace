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

@Component({
  selector: 'app-seccion-producto-administrador',
  templateUrl: './seccion-producto-administrador.component.html',
  styleUrls: ['./seccion-producto-administrador.component.css']
})
export class SeccionProductoAdministradorComponent implements OnInit {
  @Input() objetoUsuario: Usuario = new Usuario();
  consultaproducto: Producto = new Producto();
  mostrarLoading=false
  mensajeLoading=""

  seccionProPendientes = true;
  seccionProAprobados = false;
  seccionProRechazados = false;
  poputaprobacion=false;

  listaproductosPendientes : Productocompleto []=[]
  listaproductosAprobados : Productocompleto []=[]
  listaproductosRechazados : Productocompleto []=[]
  productos: Producto[] = []; 

  actualizacionproducto: Producto = new Producto();

  tienda: Tienda = new Tienda();
  tienda_recibida: Tienda = new Tienda();
  usuario: Usuario= new Usuario();
  correo: Correo = new Correo();


  idEstadoProducto = 0;
  tituloPopup = ""
  textoPopup = ""

  constructor( public _productoService : ProductoService,
    public router : Router,
    public _categoriaService: CategoriaService,
    public _productCompletoService: ProductocompletoService,
    public _tiendaService: TiendaService,
    public _correoService: CorreoService
    
    ) { }

  ngOnInit( ): void {
    this.traerListadoProductosporTienda()
  }

  PTProduct = (e:any) => { 
    this.actualizacionproducto= new Producto()
    //Pendiente = 1 
    //Aprobado = 2 
    //Rechazado = 3 
    this.idEstadoProducto = 1;
    this.tituloPopup = "Marcar Producto como Pendiente"
    this.textoPopup = "Se cambiará a estado pendiente el producto "
    this.editarProducto(e.row.data)  
  }

  APProduct = (e:any) => { 
    this.actualizacionproducto= new Producto()
    this.idEstadoProducto = 2;
    this.tituloPopup = "Aprobar Producto"
    this.textoPopup = "Se aprobará el producto "
    this.editarProducto(e.row.data)  
  }

  RCProduct = (e:any) => { 
    this.actualizacionproducto= new Producto()
    this.idEstadoProducto = 3;
    this.tituloPopup = "Rechazar Producto"
    this.textoPopup = "Se rechazará el producto "
    this.editarProducto(e.row.data)  
  }

  editarProducto(product: Producto){
    this.actualizacionproducto=product
    this.poputaprobacion=true;
    console.log(product)
/*     Swal.fire({
      title: this.tituloPopup,
      text: this.textoPopup + product.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.poputaprobacion=false;
        product.id_estado_pro = this.idEstadoProducto;
        this._productoService.actualizarEstado(product).subscribe(
          (res) => { Swal.fire("Ok","Producto Actualizado","success");
                    this.traerListadoProductosporTienda()},
          (err) => { Swal.fire('error')}
        ) 
      }
    }) */ 
  }

  actualizar_estado_pro(){
    this.poputaprobacion=false;
    this.actualizacionproducto.id_estado_pro = this.idEstadoProducto;
    console.log("el id a acutalizar"+this.actualizacionproducto.id_estado_pro)
    this._productoService.actualizarEstado(this.actualizacionproducto).subscribe(
      (res) => { this.traerListadoProductosporTienda()
        this.consultar_tienda();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Producto actualizado',
          showConfirmButton: false,
          timer: 1500
        });
                },
      (err) => { Swal.fire('error')}
    )  

  }
  consultar_tienda(){
    this.tienda_recibida=new Tienda();
    this.tienda= new Tienda();
    this.tienda.id_tienda= this.actualizacionproducto.id_tienda.toString()
    this._tiendaService.obtener_datos_tienda_porid(this.tienda).subscribe(
      (res) => { 
        var tiendas = res as Tienda[];
        this.tienda_recibida = tiendas[0];
        this.enviar_correo_tienda();
      },
      (err) => {  Swal.fire("Error al guardar","Su producto no pudo ser agregado","error")} 
    )
  }


  enviar_correo_tienda(){

    this.correo.email=this.tienda_recibida.correo_electronico;
    this.correo.asunto="Respuesta de publicacion del producto";
    console.log("este es el correo"+this.correo.email)
    this.correo.mensaje=this.actualizacionproducto.nombre;
    this._correoService.enviar_correo_aprobacion_producto(this.correo).subscribe(
      (res) => { console.log("estoy en la respuesta"+res);
      
       
        
      },
      (err) => {  Swal.fire("Error","No se pudo actualizar su contraseña","error")})


  }

  cancelar(){
    this.poputaprobacion=false
  }


  mostrarSecProducto(numero : number){
    if(numero == 1) {
      this.seccionProPendientes = true;
      this.seccionProAprobados = false;
      this.seccionProRechazados = false;
    }  
    else if(numero == 2){
      this.seccionProPendientes = false;
      this.seccionProAprobados = true;
      this.seccionProRechazados = false;
    }
    else if(numero == 3){
      this.seccionProPendientes = false;
      this.seccionProAprobados = false;
      this.seccionProRechazados = true;
    }
  }

  traerListadoProductosporTienda(){
    this._productCompletoService.obtener_completo_administrador().subscribe(
      (res) => { var lista = res as Productocompleto[];
                 this.nuevoarregloproductos(lista)},
      (err) => { }
    )
  }

  nuevoarregloproductos(lista: Productocompleto[]){
    this.listaproductosPendientes = []
    this.listaproductosAprobados = []
    this.listaproductosRechazados = []
    lista.forEach(element=>{
      /* console.log(element) */
      if(element.id_estado_pro==1){
        console.log("entre aqui")
        this.listaproductosPendientes.push(element)
      }
        
      else if(element.id_estado_pro==2)
        this.listaproductosAprobados.push(element)
      else if(element.id_estado_pro==3)
        this.listaproductosRechazados.push(element)
    })

  }

}
