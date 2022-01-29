import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdenCompra } from 'src/app/clases/ordenCompra';
import { Producto } from 'src/app/clases/producto';
import { Productocompleto } from 'src/app/clases/Productocompleto';
import { ProductosPorOrdenDTO } from 'src/app/clases/productosOrdenCompra';
import { Usuario } from 'src/app/clases/usuario';
import { AuthenService } from 'src/app/services/authen.service';
import { ProductoService } from 'src/app/services/productos.services';

@Component({
  selector: 'app-usuario-vendedor',
  templateUrl: './usuario-vendedor.component.html',
  styleUrls: ['./usuario-vendedor.component.css']
})
export class UsuarioVendedorComponent implements OnInit {

  seccionOrdenes = true;
  seccionProducto = false;
  seccionTienda = false;
  seccionPago = false;
  seccionPedido = false;
  isLoged = false;
  nombreUsuario = ""
  usuarioLogueado : Usuario = new Usuario();
  listapro : Producto []=[]
  listaprocategoria : Producto []=[] 
  productotemproral: Producto = new Producto();
  primerdigito= ""
  totalCompra = 0;
  listacompletaproductos : Productocompleto []=[]


  ordenes: OrdenCompra[] = [];
  productosPorOrdenDTO: ProductosPorOrdenDTO[] = [];
  


  constructor(private router: Router,
        public authenService : AuthenService,
        public _productoService: ProductoService) { }

  ngOnInit(): void {
    this.cargarUsuarioLogueado()

    // Crear un metodo para traer la tienda asociada al usuario si no tiene tienda setear la variable idNewTienda en true, sino en false
  }

  cargarUsuarioLogueado() {
    new Promise((res, err) => {
      var cedula = localStorage.getItem("cedulaUser") ?? "";
      this.authenService.getUserLogueado(cedula)
        .subscribe(
          res => {
            var arreglo = res as Usuario[];
            this.isLoged = true;
            this.usuarioLogueado = arreglo[0];
            var array = this.usuarioLogueado.nombres.split(" ");
            this.nombreUsuario = array[0];
            var cedul= this.usuarioLogueado.cedula.toString()
            if(cedul.length ===9){
              console.log(cedul.length + "esta es la longitud del cedula")
              this.primerdigito="0"
            }
          },
          err => {})
    });
  }


  logout() {
    localStorage.removeItem("cedulaUser");
    localStorage.removeItem("token");
    localStorage.removeItem("logged");
    this.router.navigate(["/login"]);
  }

  click(e:any){

  }

  registrar(){

  }

  redirigir(){
    this.router.navigate(["/principal"]);
  }

  irPerfilUsuario(){
    this.usuarioLogueado.id_tipo_usuario =2;
    if(this.usuarioLogueado.id_tipo_usuario == 1)
      this.router.navigate(['/usuarioComprador']);
    else if(this.usuarioLogueado.id_tipo_usuario == 2)
      this.router.navigate(['/usuarioVendedor']);
  }

  verCarrito(){
    this.router.navigate(['/carrito-compras']);
  }

  eliminarRegistro(i: number) {
    this.ordenes.splice(i, 1);
    this.calcularTotal();
  }

  calcularTotal(){
    this.totalCompra = 0;
    /* this.ordenes.forEach(element=>{
      element.total = element.cantidad * element.precio
      this.totalCompra = this.totalCompra + element.total 
    }) */
  }

  editarPerfil(){
    this.router.navigate(['/register'], { queryParams: { id: this.usuarioLogueado.cedula } });
  }

 

  mostrarSeccion(numero : number){
    switch (numero) {
      case 1:
        this.seccionOrdenes = true;
        this.seccionProducto = false;
        this.seccionTienda = false;
        this.seccionPago = false;
        this.seccionPedido = false;
       break;
      case 2:
        this.seccionOrdenes = false;
        this.seccionProducto = true;
        this.seccionTienda = false;
        this.seccionPago = false;
        this.seccionPedido = false;
        break;
      case 3:
        this.seccionOrdenes = false;
        this.seccionProducto = false;
        this.seccionTienda = true;
        this.seccionPago = false;
        this.seccionPedido = false;
        break;
      case 4:
        this.seccionOrdenes = false;
        this.seccionProducto = false;
        this.seccionTienda = false;
        this.seccionPago = true;
        this.seccionPedido = false;
        break;
      case 5:
        this.seccionOrdenes = false;
        this.seccionProducto = false;
        this.seccionTienda = false;
        this.seccionPago = false;
        this.seccionPedido = true;
        break;
      default:    
    }  
    

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
}

export class Productos {
  ID: number;
  Nombre: string;
  Cantidad: number;
  Estado: string;
  Descripcion: string;
  Picture : string;
  constructor(){
    this.ID = 0;
    this.Nombre = "";
    this.Cantidad = 0;
    this.Estado = "";
    this.Descripcion = "";
    this.Picture = "";
  }
}