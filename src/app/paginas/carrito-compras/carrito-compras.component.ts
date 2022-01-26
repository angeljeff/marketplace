import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosEnvio } from 'src/app/clases/datosEnvio';
import { OrdenTemporal } from 'src/app/clases/ordenTemporal';
import { Producto } from 'src/app/clases/producto';
import { Usuario } from 'src/app/clases/usuario';
import { AuthenService } from 'src/app/services/authen.service';
import { ProductoService } from 'src/app/services/productos.services';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {
  mostrarPaso1 = true;
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

    ordenes: OrdenTemporal[] = [{
    nombre_producto: 'Producto1',
    cantidad : 10,
    id_orden : 1,
    precio : 10.50,
    id_producto : 10,
    total : 50,
    imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
  }, {
    nombre_producto: 'Producto2',
    cantidad : 2,
    id_orden : 1,
    precio : 18.50,
    id_producto : 11,
    total : 25,
    imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
  }]; 

  productos: Producto[] = [/* {
  nombre: 'Producto1',
  contador : 10,
  descripcion : "Aqui va la descripcion",
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
} */]; 

  constructor(private router: Router,
        public authenService : AuthenService,
        public _productoService: ProductoService) { }

  ngOnInit(): void {
    this.cargarUsuarioLogueado();
    this.calcularTotal();
    this.productoMostrado = this.productos[0];
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

  seguirComprando(){
    var tiendaId = 1; // setear el Id de ña tienda perteneciente a un producto de la orden
    this.router.navigate(['/productos-tienda'], { queryParams: { id: tiendaId } });
  }

  mostrarPopupProducto(productoOrden : OrdenTemporal){
    // LLamar al metodo obtener producto y traer los datos 
    //asignarle a la variable productoEncontrado
    this.popupVisible = true;
    
  }

  calcularTotal(){
    this.totalCompra = 0;
    this.ordenes.forEach(element=>{
      element.total = element.cantidad * element.precio
      this.totalCompra = this.totalCompra + element.total 
    })
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
    console.log(num)
  }

  realizarPedido(){
    //aqui mandar a guardar la orden con estado solicitada
  }


  eliminarRegistro(i: number) {
    this.ordenes.splice(i, 1);
    this.calcularTotal();
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
          console.log(lista.length+ "esta es la longitud")
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
