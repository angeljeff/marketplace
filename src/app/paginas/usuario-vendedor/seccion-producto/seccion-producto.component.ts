import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Producto, Productodto } from 'src/app/clases/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/productos.services';
import { SubCategoriaService } from 'src/app/services/sub_categoria.service';

@Component({
  selector: 'app-seccion-producto',
  templateUrl: './seccion-producto.component.html',
  styleUrls: ['./seccion-producto.component.css']
})
export class SeccionProductoComponent implements OnInit {
    productonuevo: Producto = new Producto();
    consultaproducto: Producto = new Producto();
    mostrarLoading=false
    mensajeLoading=""

    seeccionNewProducto = false;
    seccionListProducto = true;

    listaproductos : Producto []=[]
  
 


  constructor( public _productoService : ProductoService,
    public router : Router,
    public _subcategoriaService: SubCategoriaService
    ) { }

  ngOnInit( ): void {
    this.traerListadoProductosporTienda()
  }

  registrar(){
    this.mensajeLoading = "Guardando Usuario";
    this.mostrarLoading = true;
    console.log(this.productonuevo)
     this._productoService.registrar(this.productonuevo).subscribe(
      (res) => {
        this.mostrarLoading = false;
        Swal.fire({
          title: 'Producto creado',
          text: "'''''",
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(["/login"]);
          }
        }) 
      
      },
      (err) => {  this.mostrarLoading = false; Swal.fire('error')}
    ) 

  }

   mostrarSecProducto(numero : number){
    if(numero == 1) {
      this.seeccionNewProducto = false;
      this.seccionListProducto = true;
    }  
    else if(numero = 2){
      this.seeccionNewProducto = true;
      this.seccionListProducto = false;
    }
  }

  traerListadoProductosporTienda(){
    this.consultaproducto.id_tienda=1
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

  /* traerListadoSubcategorias(){
    this._subcategoriaService.traerListaSubcategorias().subscribe(
      (res) => { this.listaCantones = res as Canton[];},
      (err) => { }
    )
  } */

}
