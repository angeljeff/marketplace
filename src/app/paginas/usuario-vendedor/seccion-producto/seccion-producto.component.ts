import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Producto, Productodto, Productoreserva } from 'src/app/clases/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/productos.services';
import { SubCategoriaService } from 'src/app/services/sub_categoria.service';
import { Subcategorias } from 'src/app/clases/subcategorias';
import { CategoriaService } from 'src/app/services/categorias.service';
import { Categorias } from 'src/app/clases/categorias';
import { Usuario } from 'src/app/clases/usuario';
import { Tienda } from 'src/app/clases/tienda';
import { TiendaService } from 'src/app/services/tienda.service';
import { PercentPipe } from '@angular/common';
import { Estadistica } from '../../usuario-administrador/seccion-estadistica-administrador/seccion-estadistica-administrador.component';

@Component({
  selector: 'app-seccion-producto',
  templateUrl: './seccion-producto.component.html',
  styleUrls: ['./seccion-producto.component.css']
})
export class SeccionProductoComponent implements OnInit {
    @Input() objetoUsuario: Usuario = new Usuario();
    productonuevo: Producto = new Producto();
    categorias: Categorias= new Categorias();
    subcategorias: Subcategorias= new Subcategorias();
    productonuevo2: Productodto = new Productodto();
    consultaproducto: Producto = new Producto();
    mostrarLoading=false
    mensajeLoading=""
    probarproducto=""
    password=""
    cate:any
    edicionsubcategoria=false
    isedicionpro = false;
    productobuscado: Producto = new Producto();
    consultatienda: Tienda = new Tienda();
    tiendaobtenida: Tienda = new Tienda();
    poseetienda=false

    seccionNewProducto = false;
    seccionListProducto = true;
    seccionEstadistica = false;

    listaproductos : Producto []=[]
    listasubcategorias : Subcategorias []=[]
    arregloEstadisticaProductos : Estadistica [] = []
    listacategorias : Categorias []=[]
    pipe: any = new PercentPipe('en-US');
  


  constructor( public _productoService : ProductoService,
    public router : Router,
    public _subcategoriaService: SubCategoriaService,
    public _categoriaService: CategoriaService,
    public _tiendaService: TiendaService
    ) { }

  ngOnInit( ): void {
    this.consultartienda()
    this.traerListadocategorias()
    
    
  }

  consultartienda(){
    this.consultatienda.cedula= this.objetoUsuario.cedula
    this._tiendaService.obtener_datos_tienda(this.consultatienda).subscribe(
      (res) => { var tienda = res as Tienda[];
        if(tienda.length != 0){
          this.tiendaobtenida = tienda[0]
          this.traerListadoProductosporTienda()
          console.log( this.tiendaobtenida.id_tienda + "esta es la tienda obtenida")
        }else{
        }
                },
      (err) => { }
    )
  }

  registrar(){
    this.productonuevo.id_tienda = Number(this.tiendaobtenida.id_tienda)
    this.mensajeLoading = "Guardando Producto";
    this.mostrarLoading = true;
    console.log(this.productonuevo)
     this._productoService.registrar(this.productonuevo).subscribe(
      (res) => {
        this.mostrarLoading = false;
        Swal.fire({
          title: 'Producto creado',
          text: "********",
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.productonuevo= new Producto()
          }
        }) 
      
      },
      (err) => {  this.mostrarLoading = false; Swal.fire('error')}
    ) 
 
  }

  
  editProduct = (e:any) => {  
    this.editarProducto(e.row.data)  
  }

  deleteProduct = (e:any) => {  
    this.eliminarProducto(e.row.data)  
  }

  editarProducto(product: Producto){
    this.mostrarSecProducto(2);
    this.isedicionpro = true;
    this.productonuevo = product;
  }

  eliminarProducto(product: Producto){
     Swal.fire({
        title: 'Eliminar Producto',
        text: "Está seguro de eliminar el Producto "+product.nombre,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this._productoService.eliminarproduct(product).subscribe(
            (res) => {
              this.mostrarLoading = false;
              Swal.fire({
                title: 'El producto se ha eliminado',
                text: "----------",
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'OK'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.traerListadoProductosporTienda()
                }
              }) 
            },
            (err) => {  this.mostrarLoading = false; Swal.fire('error')}
          ) 
        }
      }) 
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
    this.productonuevo.imagen ="data:image/png;base64,"+ base64textString
    console.log(this.productonuevo.imagen);
  }


  actualizar(){
    this.mensajeLoading = "Actualizando producto";
    this.mostrarLoading = true;
    console.log(this.productonuevo)
     this._productoService.actualizar(this.productonuevo).subscribe(
      (res) => {
        this.mostrarLoading = false;
        Swal.fire({
          title: 'Producto actualizado',
          text: "cambios guardados",
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.productonuevo= new Producto()
            this.isedicionpro = false
          }
        }) 
      
      },
      (err) => {  this.mostrarLoading = false; Swal.fire('error')}
    ) 
 
  }

  mostrarSecProducto(numero : number){
    if(this.tiendaobtenida.id_tienda==""){
     
      this.poseetienda=true
      this.seccionNewProducto = false;
      this.seccionListProducto = false;
      this.seccionEstadistica = false;
    }
    else{
      this.poseetienda=false
      if(numero == 1) {
        this.seccionNewProducto = false;
        this.seccionListProducto = true;
        this.seccionEstadistica = false;
        this.traerListadoProductosporTienda()
      }  
      else if(numero == 2){
        this.seccionNewProducto = true;
        this.seccionListProducto = false;
        this.seccionEstadistica = false;
        this.productonuevo= new Producto()
      }
      else if(numero == 3){
        console.log("entre en if")
        this.seccionNewProducto = false;
        this.seccionListProducto = false;
        this.seccionEstadistica = true;
        this.productonuevo= new Producto()
      }

    }
    
  }

  traerListadoProductosporTienda(){
    this.consultaproducto.id_tienda= Number(this.tiendaobtenida.id_tienda)
    this._productoService.obtener_productos(this.consultaproducto).subscribe(
      (res) => { var lista = res as Productodto[];
        this.nuevoarregloproductos(lista)},
      (err) => { }
    )
  }

  customizeTooltip = (arg: any) => ({
    text: `${arg.valueText} - ${this.pipe.transform(arg.percent, '1.2-2')}`,
  });

  customizeLabel(arg:any) {
    return `${arg.argumentText} - ${arg.valueText} (${arg.percentText})`;
  }


  nuevoarregloproductos(lista: Productodto[]){
    this.listaproductos= []

    lista.forEach(element=>{
      if(element.id_estado_pro==1)
        element.nombre_estado= "Pendiente"
      else if(element.id_estado_pro==2)
        element.nombre_estado= "Publicado"
      else if(element.id_estado_pro==3)
        element.nombre_estado= "No publicado"
     this.listaproductos.push(element)
    })
    this.crearObjetoEstadistica()

  }

  crearObjetoEstadistica(){
    this.arregloEstadisticaProductos=[]
    this.listaproductos.forEach(element=>{
      var nuevaEstadistica = new Estadistica();
      nuevaEstadistica.nombre = element.nombre
      nuevaEstadistica.val = element.contador
      this.arregloEstadisticaProductos.push(nuevaEstadistica)
    })
  }

  traerListadoSubcategorias(){
    this._subcategoriaService.traerListaSubcategorias().subscribe(
      (res) => { this.listasubcategorias = res as Subcategorias[];},
      (err) => { }
    )
  }

  traerListadocategorias(){
    this._categoriaService.traerListaCtegorias().subscribe(
      (res) => { this.listacategorias = res as Categorias[];},
      (err) => { }
    )
  }
 
  traersub(e:any){
    
    if(this.categorias.id_categoria > 0){
      this.subcategorias.id_categoria= this.categorias.id_categoria
      this._subcategoriaService.traerListaSubcategoriasporidcat(this.subcategorias).subscribe(
        (res) => { this.listasubcategorias = res as Subcategorias[];
          this.edicionsubcategoria=true},
        (err) => { }
      )

    }

}

verificarcampos(){
  if(this.productonuevo.nombre !==""){
    if(this.edicionsubcategoria!==false){
      if(this.productonuevo.id_sub_categoria!==0){
        if(this.productonuevo.precio >0 && this.productonuevo.precio!==null){
          if(this.productonuevo.stock!==0 && this.productonuevo.stock!==null){
            if(this.productonuevo.descripcion!==""){
              if(!this.isedicionpro){
                this.registrar()
              }else{
                this.actualizar()
              }
            }else{this.mostrarmensajes('Por favor establezca una breve descripción del producto')}
          }else{this.mostrarmensajes('Por favor indique la disponibilidad del producto')}
        }else{this.mostrarmensajes('Por favor establezca un precio al producto')}
      }else{this.mostrarmensajes('Debe seleccionar una subcategoría')}
    }else{this.mostrarmensajes('Debe seleccionar una categoría')}
  }else{this.mostrarmensajes('Debe llenar el campo nombre de producto')}
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


obtenerDatosPoridproducto(){

  this.productobuscado.id_producto = "3";
  this.edicionsubcategoria=true
  this._productoService.obtener_productosporid(this.productobuscado).subscribe(
    (res) => {
      this.productonuevo = res[0];
     
    },
    (err) => { }
  )
}

}
