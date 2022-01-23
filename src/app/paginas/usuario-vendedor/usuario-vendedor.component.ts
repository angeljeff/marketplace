import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/clases/producto';
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

  


  constructor(private router: Router,
        public authenService : AuthenService,
        public _productoService: ProductoService,) { }

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

  editarPerfil(){
    this.router.navigate(['/register'], { queryParams: { id: "0995553816" } });
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