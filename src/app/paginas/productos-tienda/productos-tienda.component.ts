import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/clases/producto';
import { ProductoService } from 'src/app/services/productos.services';
import { AuthenService } from 'src/app/services/authen.service';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Categorias } from 'src/app/clases/categorias';
import { CategoriaService } from 'src/app/services/categorias.service';
import { ProductocompletoService } from 'src/app/services/productoscompletos';
import { Productocompleto } from 'src/app/clases/Productocompleto';
import { ArrayMenu } from '../principal/menu';

@Component({
  selector: 'app-productos-tienda',
  templateUrl: './productos-tienda.component.html',
  styleUrls: ['./productos-tienda.component.css']
})
export class ProductosTiendaComponent implements OnInit {

  listaproductos : Producto []=[]
  listapro : Producto []=[]
  listaprocategoria : Producto []=[]
  nombreUsuario = ""
  listacategorias : Categorias []=[]
  listapresentacioncategorias : Categorias []=[]
  listaprocompleto : Productocompleto []=[]
  listacompletaproductos : Productocompleto []=[]
  nomb=""
  productotemproral: Producto = new Producto();
  cedula = ""
   
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

  isLoged = false;
  idTienda = 0;
  usuarioLogueado : Usuario = new Usuario();
  constructor(public router: Router,
    public _productoService: ProductoService,
    public authenService : AuthenService,
    public userService: UsuarioService,
    public _categoriaService: CategoriaService,
    private route: ActivatedRoute,
    public _productocomletoService: ProductocompletoService) { }

  ngOnInit(): void {
    this.cargarUsuarioLogueado();

    this.route.queryParams.subscribe(params => {this.idTienda = params['id'] || 0 });

    if(this.idTienda != 0){
      //obtener los productos por la tienda especificada
    }

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


  irPerfilUsuario(){
    this.usuarioLogueado.id_tipo_usuario =2;
    if(this.usuarioLogueado.id_tipo_usuario == 1)
      this.router.navigate(['/usuarioComprador']);
    else if(this.usuarioLogueado.id_tipo_usuario == 2)
      this.router.navigate(['/usuarioVendedor']);
  }

  buscarproducto(){
    this.listaprocompleto=[]
    for (let i in this.listacompletaproductos){
      if(this.nomb == this.listacompletaproductos[i].nombre){
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
          }},
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
