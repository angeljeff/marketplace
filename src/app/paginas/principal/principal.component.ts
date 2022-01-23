import { LogLevel } from '@angular/compiler-cli/private/localize';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 import { Productos } from '../usuario-vendedor/usuario-vendedor.component';
import { Producto, Productodto, Productoreserva } from 'src/app/clases/producto';
import { ProductoService } from 'src/app/services/productos.services';
import { ArrayMenu} from './menu';
import { AuthenService } from 'src/app/services/authen.service';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

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

  data2: string [] = [ 

      'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Charles', 'Joseph', 'Thomas', 'Christopher', 'Daniel', 'Paul', 'Mark', 'Donald', 'George', 'Kenneth', 'Steven', 'Edward', 'Brian', 'Ronald', 'Anthony', 'Kevin', 'Jason', 'Jeff', 'Mary', 'Patricia', 'Linda', 'Barbara', 'Elizabeth', 'Jennifer', 'Maria', 'Susan', 'Margaret', 'Dorothy', 'Lisa', 'Nancy', 'Karen', 'Betty', 'Helen', 'Sandra', 'Donna', 'Carol', 'Ruth', 'Sharon', 'Michelle', 'Laura', 'Sarah', 'Kimberly', 'Deborah',
    ];


  productos: Productos[] = [{
  ID: 1,
  Nombre: 'Producto1',
  Cantidad: 10,
  Estado: 'Activo',
  Descripcion: 'CEO',
  Picture: 'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
 
}, {
  ID: 10,
  Nombre: 'Producto2',
  Cantidad: 20,
  Estado: 'Activo',
  Descripcion: 'CEO',
  Picture: 'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
},
{
  ID: 10,
  Nombre: 'Producto3',
  Cantidad: 20,
  Estado: 'Activo',
  Descripcion: 'CEO',
  Picture: 'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
},
{
  ID: 10,
  Nombre: 'Producto4',
  Cantidad: 20,
  Estado: 'Activo',
  Descripcion: 'CEO',
  Picture: 'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
},
{
  ID: 10,
  Nombre: 'Producto5',
  Cantidad: 20,
  Estado: 'Activo',
  Descripcion: 'Producto para los maices',
  Picture: 'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
},
{
  ID: 10,
  Nombre: 'Producto Nuevo',
  Cantidad: 120,
  Estado: 'Activo',
  Descripcion: 'CEO',
  Picture: 'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
}]; 



  isLoged = false;
  usuarioLogueado : Usuario = new Usuario();
  constructor(public router: Router,
    public _productoService: ProductoService,
    public authenService : AuthenService,
    public userService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarioLogueado();
    this.mandarMensaje();

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



  mandarMensaje(){

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
