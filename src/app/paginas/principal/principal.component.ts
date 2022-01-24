import { Component, OnInit } from '@angular/core';
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
import { OrdenTemporal } from 'src/app/clases/ordenTemporal';
import { Tienda } from 'src/app/clases/tienda';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  listaproductos : Producto []=[]
  listapro : Producto []=[]
  listaprocategoria : Producto []=[]
  nombreUsuario = ""
  listacategorias : Categorias []=[]
  listapresentacioncategorias : Categorias []=[]
  listaprocompleto : Productocompleto []=[]
  listacompletaproductos : Productocompleto []=[]
  datosTienda : Tienda = new Tienda()
  nomb=""
  popupVisible = false
  popupTienda = false
  productoMostrado : Productocompleto = new Productocompleto()
  
  totalCompra = 0;
  productotemproral: Producto = new Producto();
  cedula = ""

  ordenes: OrdenTemporal[] = [{
    nombre_producto: 'Producto1',
    cantidad : 3,
    id_orden : 1,
    precio : 8.50,
    id_producto : 10,
    total : 50,
    imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
  }, {
    nombre_producto: 'Producto2',
    cantidad : 5,
    id_orden : 1,
    precio : 18.50,
    id_producto : 11,
    total : 25,
    imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
  }, {
    nombre_producto: 'Producto3',
    cantidad : 1,
    id_orden : 1,
    precio : 12.50,
    id_producto : 11,
    total : 25,
    imagen :  'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
  }];
   

   menus: ArrayMenu[] = [{
    id: '1',
    name: 'Plaguicidas',
    items: [{
      id: '1_1',
      name: 'Item1',
    }, {
      id: '1_2',
      name: 'Item2',
     
    }],
  }, {
    id: '2',
    name: 'Fertilizantes',
    items: [{
      id: '2_1',
      name: 'Item3',
     
    }, {
      id: '2_2',
      name: 'Item4',
     
    }],
  }];

  data2: string [] = [ 

      'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Charles', 'Joseph', 'Thomas', 'Christopher', 'Daniel', 'Paul', 'Mark', 'Donald', 'George', 'Kenneth', 'Steven', 'Edward', 'Brian', 'Ronald', 'Anthony', 'Kevin', 'Jason', 'Jeff', 'Mary', 'Patricia', 'Linda', 'Barbara', 'Elizabeth', 'Jennifer', 'Maria', 'Susan', 'Margaret', 'Dorothy', 'Lisa', 'Nancy', 'Karen', 'Betty', 'Helen', 'Sandra', 'Donna', 'Carol', 'Ruth', 'Sharon', 'Michelle', 'Laura', 'Sarah', 'Kimberly', 'Deborah',
    ];



  isLoged = false;
  usuarioLogueado : Usuario = new Usuario();
  constructor(public router: Router,
    public _productoService: ProductoService,
    public authenService : AuthenService,
    public userService: UsuarioService,
    public _categoriaService: CategoriaService,
    public _productocomletoService: ProductocompletoService) { }

  ngOnInit(): void {
    this.cargarUsuarioLogueado();
    this.mandarMensaje();
    this.mostrarproductos();
    this.calcularTotal();

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
            this.userService.setearObjetoUsuario(this.usuarioLogueado);
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

  verCarrito(){
    this.router.navigate(['/carrito-compras']);
  }

  eliminarRegistro(i: number) {
    this.ordenes.splice(i, 1);
    this.calcularTotal();
  }

  calcularTotal(){
    this.totalCompra = 0;
    this.ordenes.forEach(element=>{
      element.total = element.cantidad * element.precio
      this.totalCompra = this.totalCompra + element.total 
    })
  }

  mostrarPopup(producto : Productocompleto){
    this.productoMostrado = producto
    this.popupVisible = true;
  }

  mostrarPopupTienda(idTienda : number){
    // metodo para traer datos tienda
    // tienda tarida se asiga a la variable de a tienda en ep popup
    //this.datosTienda = tiendaEncontrada
    this.popupTienda = true;
    this.datosTienda.nombre = "AGRIPAC nombre mas largo"
  }

  verProductosTienda(idTienda : string){
    var tiendaId= Number(idTienda)
    this.router.navigate(['/productos-tienda'], { queryParams: { id: tiendaId } });
  }


  mandarMensaje(){

  }

  irPerfilUsuario(){
    this.usuarioLogueado.id_tipo_usuario =2;
    if(this.usuarioLogueado.id_tipo_usuario == 1)
      this.router.navigate(['/usuarioComprador']);
    else if(this.usuarioLogueado.id_tipo_usuario == 2)
      this.router.navigate(['/usuarioVendedor']);
  }

  buscarproducto(){
    console.log(this.listacompletaproductos)
    console.log("nombre" + this.nomb)
    this.listaprocompleto=[]
    console.log(this.listacompletaproductos)
    for (let i in this.listacompletaproductos){
      console.log("entre cc" + this.listacompletaproductos[i])
      if(this.nomb == this.listacompletaproductos[i].nombre){
        console.log("entre" + i)
     
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
   /*  this._productoService.obtener_porid_subcategorias(this.productotemproral).subscribe(
      (res) => { var lista = res as Producto[];
         this.arreglodeproductosactivos(lista)
                },
      (err) => { }
    )     */
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
           /* if(cuenta === lista1.length){
              /* this.arreglodeproductosactivos(this.listaprocategoria) */
           /* }*/
          }},
        (err) => { }
      )

      
     /*  this._productoService.obtener_porid_subcategorias(this.productotemproral).subscribe(
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
    )  */
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

iniciodepagina(){
  window.scrollTo(0,0)
}
  mostrarproductos(){
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

 /*  traerproductoscompletos(){
    this.listaprocompleto.splice(0, this.listaprocompleto.length)
    this._productocomletoService.traerpro_completos().subscribe(
      (res) => {  this.listaprocompleto = res as Productocompleto[];
        console.log(this.listaprocompleto)
       
              },
      (err) => { }
  )

  } */


  itemClick(data:any) {
    const item = data.itemData;

    console.log(item);
    switch (item.name) {
      case "Item1":
        this.router.navigate(["/pagina"]);
        break;
      case "Item2":
      this.router.navigate(["/pagina3"]);
      break;
    }
      

    if (item.price) {
      //this.currentProduct = item;
    }
  }

  comprar(){

  }
 
}
