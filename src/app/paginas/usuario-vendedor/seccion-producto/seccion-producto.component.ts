import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { Producto } from '../usuario-vendedor.component';

@Component({
  selector: 'app-seccion-producto',
  templateUrl: './seccion-producto.component.html',
  styleUrls: ['./seccion-producto.component.css']
})
export class SeccionProductoComponent implements OnInit {
    usuarioNuevo: Usuario = new Usuario();

    seeccionNewProducto = false;
  seccionListProducto = true;
  




  productos: Producto[] = [{
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
  Descripcion: 'CEO',
  Picture: 'https://agroactivocol.com/wp-content/uploads/2020/06/fosfitek-boro-producto.png',
}];



  constructor() { }

  ngOnInit(): void {
  }

  registrar(){

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


}
