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

    seccionNewProducto = false;
    seccionListProducto = true;

    listaproductos : Producto []=[]
    listasubcategorias : Subcategorias []=[]
    listacategorias : Categorias []=[]
  
    rules = { X: /[02-9]/ };


productos: Producto[] = [{
  nombre: 'Producto1',
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
}]; 



  constructor( public _productoService : ProductoService,
    public router : Router,
    public _subcategoriaService: SubCategoriaService,
    public _categoriaService: CategoriaService
    ) { }

  ngOnInit( ): void {
     this.listaproductos = this.productos
     console.log(this.objetoUsuario.cedula + "este es usuario producto");
    this.traerListadoProductosporTienda()
    /* this.traerListadoSubcategorias() */
    this.traerListadocategorias()
    /* this.obtenerDatosPoridproducto() */ 
    
  }

  registrar(){
    /* this.productonuevo.precio= Number(this.productonuevo2.precio) */
    console.log(this.productonuevo.precio + "este es el precio")
    this.mensajeLoading = "Guardando Usuario";
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
            /* this.router.navigate(["/login"]); */
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
          //agregar metodo para eliminar producto
        }
      }) 
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
            /* this.router.navigate(["/login"]); */
          }
        }) 
      
      },
      (err) => {  this.mostrarLoading = false; Swal.fire('error')}
    ) 
 
  }

  mostrarSecProducto(numero : number){
    if(numero == 1) {
      this.seccionNewProducto = false;
      this.seccionListProducto = true;
    }  
    else if(numero = 2){
      this.seccionNewProducto = true;
      this.seccionListProducto = false;
    }
  }

  traerListadoProductosporTienda(){
    this.consultaproducto.id_tienda=2
    this._productoService.obtener_productos(this.consultaproducto).subscribe(
      (res) => { var lista = res as Productodto[];
        this.nuevoarregloproductos(lista)
        console.log(lista)
                  //this.llenarArregloTiposUsuario(lista)
                },
      (err) => { }
    )
  }

  nuevoarregloproductos(lista: Productodto[]){

    lista.forEach(element=>{
      if(element.id_estado_pro==1)
        element.nombre_estado= "Pendiente"
      else if(element.id_estado_pro==2)
        element.nombre_estado= "Publicado"
      else if(element.id_estado_pro==1)
        element.nombre_estado= "No publicado"

     this.listaproductos.push(element)
    
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
      console.log(res + "esta es el producto devuelto")
      
      //this.nombreCanton = this.listaCantones.find(element => element.id_cantones == this.usuarioNuevo.id_cantones)?.descripcion ?? "" ;
     
    },
    (err) => { }
  )
}

}
