import { Component, OnInit } from '@angular/core';
import { Producto } from '../usuario-vendedor.component';

@Component({
  selector: 'app-ordenes-vendedor',
  templateUrl: './ordenes-vendedor.component.html',
  styleUrls: ['./ordenes-vendedor.component.css']
})
export class OrdenesVendedorComponent implements OnInit {

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

  seccionListActivas: boolean= true;
  seccionTodasordenes: boolean= false;

  constructor() { }

  ngOnInit(): void {

  }

  
   mostrarSecProducto(numero : number){
    if(numero == 1) {
      this.seccionListActivas= true;
      this.seccionTodasordenes = false;
    }
      
    else if(numero = 2){
     this.seccionListActivas= false;
      this.seccionTodasordenes = true;
    }


  }
}
