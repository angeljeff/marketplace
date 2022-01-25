import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Producto, Productodto } from 'src/app/clases/producto';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/productos.services';
import { CategoriaService } from 'src/app/services/categorias.service';
import { Usuario } from 'src/app/clases/usuario';

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

    listaproductosPendientes : Producto []=[]
    listaproductosAprobados : Producto []=[]
    listaproductosRechazados : Producto []=[]


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

idEstadoProducto = 0;
tituloPopup = ""
textoPopup = ""



  constructor( public _productoService : ProductoService,
    public router : Router,
    public _categoriaService: CategoriaService
    ) { }

  ngOnInit( ): void {
    this.listaproductosPendientes = this.productos
    console.log(this.objetoUsuario.cedula + "este es usuario producto");
    this.traerListadoProductosporTienda()

  }

  PTProduct = (e:any) => { 
    //Pendiente = 1 
    //Aprobado = 2 
    //Rechazado = 3 
    this.idEstadoProducto = 1;
    this.tituloPopup = "Marcar Producto como Pendiente"
    this.textoPopup = "Se cambiará a estado pendiente el producto "
    this.editarProducto(e.row.data)  
  }

  APProduct = (e:any) => { 
    this.idEstadoProducto = 2;
    this.tituloPopup = "Aprobar Producto"
    this.textoPopup = "Se aprobará el producto "
    this.editarProducto(e.row.data)  
  }

  RCProduct = (e:any) => { 
    this.idEstadoProducto = 3;
    this.tituloPopup = "Rechazar Producto"
    this.textoPopup = "Se rechazará el producto "
    this.editarProducto(e.row.data)  
  }

  editarProducto(product: Producto){
    console.log(product)
    Swal.fire({
      title: this.tituloPopup,
      text: this.textoPopup + product.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        product.id_estado_pro = this.idEstadoProducto;
        /* this._productoService.actualizar(product).subscribe(
          (res) => { Swal.fire("Ok","Producto Actualizado","success")},
          (err) => { Swal.fire('error')}
        )  */
      }
    }) 
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
        this.listaproductosPendientes.push(element)
      else if(element.id_estado_pro==2)
        this.listaproductosAprobados.push(element)
      else if(element.id_estado_pro==1)
        this.listaproductosRechazados.push(element)

     this.listaproductosPendientes.push(element)
    
    })

  }
}
