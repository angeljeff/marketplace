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
  selector: 'app-usuario-administrador',
  templateUrl: './usuario-administrador.component.html',
  styleUrls: ['./usuario-administrador.component.css']
})
export class UsuarioAdministradorComponent implements OnInit {

  seccionUsuarios = true;
  seccionProducto = false;
  seccionTienda = false;
  seccionEstadisticas = false;
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
  productosPorordenDTO: ProductosPorOrdenDTO[] = [];
  
  constructor(private router: Router,
        public authenService : AuthenService,
        public _productoService: ProductoService) { }

  ngOnInit(): void {
    this.cargarUsuarioLogueado()
  }

  cargarUsuarioLogueado() {
    new Promise((res, err) => {
      var cedula = localStorage.getItem("cedulaUser") ?? "";
      if(cedula==""){
      this.router.navigate(["/login"]);
      }else{
        this.authenService.getUserLogueado(cedula).subscribe(
          res => {
            var arreglo = res as Usuario[];
            this.isLoged = true;
            this.usuarioLogueado = arreglo[0];
            var array = this.usuarioLogueado.nombres.split(" ");
            this.nombreUsuario = array[0];
            var cedul= this.usuarioLogueado.cedula.toString()
            if(cedul.length ===9){
              this.primerdigito="0"
            }
            if(this.usuarioLogueado.id_tipo_usuario!=3){
              this.router.navigate(["/principal"]);}
          },
          err => {})

      }

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
    this.productosPorordenDTO.forEach(element=>{
      element.total_producto = element.cantidad * element.precio_producto
      this.totalCompra = this.totalCompra + element.total_producto 
    })
  }

  editarPerfil(){
    this.router.navigate(['/register'], { queryParams: { id: this.usuarioLogueado.cedula.toString() } });
  }

 

  mostrarSeccion(numero : number){
    switch (numero) {
      case 1:
        this.seccionTienda = true;
        this.seccionProducto = false;
        this.seccionUsuarios = false;
        this.seccionEstadisticas = false;
       break;
      case 2:
        this.seccionTienda = false;
        this.seccionProducto = true;
        this.seccionUsuarios = false;
        this.seccionEstadisticas = false;
        break;
      case 3:
        this.seccionTienda = false;
        this.seccionProducto = false;
        this.seccionUsuarios = true;
        this.seccionEstadisticas = false;
        break;
      case 4:
        this.seccionTienda = false;
        this.seccionProducto = false;
        this.seccionUsuarios = false;
        this.seccionEstadisticas = true;
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
    console.log("esta es el arreglo final", this.listapro)
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